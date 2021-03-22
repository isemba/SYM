import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View, FlatList, TouchableOpacity, ImageBackground, Text, Image } from 'react-native';
import { HomeData } from "../../utils/Data";
import Languages, { getLanguageText } from '../../utils/Language';
import Title from "../Title";
import HeaderBar from "../HeaderBar";
import {Color} from "../../utils/Colors";
import {checkNetworkInfo} from "../../utils/Connection";
import {getMeditationGroups} from "../../utils/Utils";
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import {navigate, setWelcome} from "../RootNavigation";
import * as Analytics from "expo-firebase-analytics";
import Slider from '@react-native-community/slider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var musicList;
const sound = new Audio.Sound();
class MusicScreen extends Component {

    flatListRef;
    headerListRef;
    headerLocked;
    activeIndex = 0;
    listIndex=0

    constructor(props){
        super(props);
        //console.log("props >>>")
        if(props.route.params != null && props.route.params != undefined) console.log(props.route.params.target);
        let activeID;
        //console.log(HomeData.MUSIC)
        /*MusicList = HomeData.MUSIC;
        console.log(MusicList);*/


        let tmObj;
        if(props.route.params != null && props.route.params != undefined && props.route.params.target != null){
            tmObj = props.route.params.target
        }else{
            tmObj={
                image:"",
                title:"",
                url:""
            }
        }


        this.state = {
            titles: [],
            musicList : [],
            activeObj:tmObj,
            isPlaying:false,
            soundPosition: null,
            soundDuration: null,
            shouldPlayImmediately:false,
            activeIndex:0
        }

        musicList = HomeData.MUSICLIST;
        if(this.props.route.params){
            activeID = this.props.route.params.target.cid;
        }


        musicList.forEach((item, index) => {
            console.log(item.title);
            item.groups = getMeditationGroups(item.meditations);
            if(activeID){
                item.groups.forEach(group => {
                    group.forEach(music => {
                        if(music.cid === activeID){
                            this.activeIndex = index;
                        }
                    });
                });
            }
        })

        musicList[this.activeIndex].active = true;


        this.flatListRef = React.createRef();
        this.headerListRef = React.createRef();
        that=this;
    }

    componentDidMount(){

        console.log("activeIndex: " + this.activeIndex );
        this.props.navigation.addListener('blur', this._onBlur);
        this.props.navigation.addListener('focus', this._onFocus);
        var tmObj;
        var sp = false;
        if(this.state.activeObj.url === ""){
            tmObj = musicList[this.activeIndex].meditations[0];
        }else{
            tmObj = this.state.activeObj;
            sp = true;
        }
        this.mList = musicList;
        this.setState({
            //musicList : musicList,
            activeObj:tmObj,
            shouldPlayImmediately:sp
        }, ()=>{
            if(this.activeIndex > 0){
                setTimeout(()=>{
                    this.changeActiveList(this.activeIndex);
                }, 500);
            }
            this.checkSoundFile(true);
            console.log(this.state.activeObj)
        });

    }
    componentWillUnmount() {
        this.props.navigation.removeListener('blur', this._onBlur);
        this.props.navigation.removeListener('focus', this._onFocus);
        this.setState({
            shouldPlayImmediately:false,
            activeObj:{
                image:"",
                title:"",
                url:""
            }
        })
        sound.stopAsync().then(sound.unloadAsync());
        //this.unloadSound(false);
    }
    _onFocus = () => {
        console.log("network >>>");
        checkNetworkInfo();
        if(HomeData.STARTER.showVideo){
            HomeData.STARTER.showVideo = false;
            setWelcome();
            navigate('WelcomeVideo');
        }

        //console.log(sound)
    }
    _onBlur = () => {
        //console.log("navigate away");
        //this.checkSoundFile(false);


    }
    _onPlaybackStatusUpdate = playbackStatus => {
        if(playbackStatus.isLoaded && playbackStatus.isPlaying)  {
            this.setState({
                soundDuration: playbackStatus.durationMillis,
                soundPosition: playbackStatus.positionMillis,
            });
        }
      };

    async checkSoundFile(load){
        console.log("checkSoundFile "+load);
        console.log(this.state);
        if(this.state.isPlaying){
            await sound.stopAsync();
            this.unloadSound(load)
        }else if(that.state.hasSoundLoaded){
            this.unloadSound(load)
        }else if(load){
             this.loadSound()
        }

    }
    async unloadSound(load){
        await sound.unloadAsync().then((status)=>{
            console.log("unloaded");
            console.log(status);
            that.setState({isPlaying:false, isLoaded:false}, ()=> {if(load)that.loadSound()});
        });
    }
    async loadSound(){
        if(!this.state.isLoading){
            console.log("load playing? "+that.state.isPlaying)
            that.setState({isLoading:true, isPlaying:false}, ()=> that.loadTargetSound());

        }
    }
    async loadTargetSound(){
        try{
            //console.log(sound);
            await sound.loadAsync({uri:that.state.activeObj.url}).then((status)=>{
                that.setState({isLoading:false,isLoaded:true, hasSoundLoaded:true}, ()=>{
                    console.log("soundloaded")
                    sound.setOnPlaybackStatusUpdate(that._onPlaybackStatusUpdate);
                    if(that.state.shouldPlayImmediately) that.playPause();
                });

                //sound.setProgressUpdateIntervalAsync(500);
            });
        }catch(e){
            console.error(e);
        }
    }
    playPause(){
        if(that.state.isLoaded){
            console.log(that.state.isPlaying);
            let p= !that.state.isPlaying;
            that.setState({isPlaying:p}, ()=>{
                that.playPauseSound();
            });

        }else{
            setTimeout(function(){that.playPause()}, 500);
        }
    }
    async playPauseSound(){
        console.log(that.state.isPlaying);
            if(that.state.isPlaying){
                await sound.playAsync().then((s)=> {
                    console.log(s);
                    console.log("playing!")
                });
            }else{
                await sound.pauseAsync().then((s)=> {
                    console.log(s);
                    console.log("paused!")
                });;
            }
    }
    changeActiveList = index => {
        console.log("changeActiveList with: " + index);
        /*musicList.forEach((item, ind) =>{
            item.active = index === ind;
        });

        this.setState({
            musicList : musicList
        });*/

        this.setState({
            activeIndex : index
        });
       try {
           this.headerLocked = true;
           this.headerListRef.current.scrollToIndex({index});
           this.flatListRef.current.scrollToIndex({index});


           setTimeout(()=>{
               this.headerLocked = false;
           }, 1000);

       }catch (e){

       }
    };

    renderHeaderItem = ({item, index}) => (

        <Title
            //title={getLanguageText(item.title)}
            title={item.title}
            active={this.state.activeIndex == index}
            key={"musicTitle_" + index}
            onPress={() => {
                this.changeActiveList(index);
            }}
        />
    )

    renderScreen = ({item: { groups }, index}) => (
        <ScrollView
            style={styles.musicContainer}
            showsVerticalScrollIndicator={false}
            key={"music_screen_"+index}
        >
            {
                groups.map((group, index) => (addMeditationCards(group, index)))
            }

            <View style={{height: windowHeight / 10}}/>
        </ScrollView>
    )

    onViewableItemsChanged = ({ viewableItems, changed }) => {
       // console.log("Visible items are", viewableItems);
        //console.log("Changed in this iteration", changed);

        if(!viewableItems || viewableItems.length == 0) return;

        console.log(viewableItems[0])
        const index = viewableItems[0].index;

        if(this.headerListRef != null){
            //this.changeActiveList(index)

            /*musicList.forEach((item, ind) =>{
                item.active = index === ind;
            });

            this.setState({
                musicList : musicList
            });

            */
           //console.log("onViewableItemsChanged > "+index)
            if(!this.headerLocked){
                this.setState({
                    activeIndex : index
                });
                this.headerListRef.current.scrollToIndex({index});
            }

        }


    }

    _onSeekSliderValueChange = (value) => {
        console.log("SEEK SLIDER VALUE", value);
        if (this.sound != null && !this.isSeeking) {
          this.isSeeking = true;
          this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
          this.sound.pauseAsync();
        }
      }

      _onSeekSliderSlidingComplete = async (value) => {
        if (this.sound != null) {
          this.isSeeking = false;
          const seekPosition = value * this.state.soundDuration;
          if (this.shouldPlayAtEndOfSeek) {
            this.sound.playFromPositionAsync(seekPosition);
          } else {
            this.sound.setPositionAsync(seekPosition);
          }
        }
      }

      _getSeekSliderPosition() {
        if (
          sound != null &&
          this.state.soundPosition != null &&
          this.state.soundDuration != null
        ) {
          return this.state.soundPosition / this.state.soundDuration;
        }
        return 0;
      }
    render() {
        //let { id } = this.props.route.params;

        //const { musicList } = this.state;
        //const { musicList } = this.mList;
        return (

            <ImageBackground source={Color.BG_IMAGE} style={styles.image}>
                <HeaderBar title={getLanguageText(Languages.MUSIC)} />
                <FlatList
                    style={[styles.container, {marginBottom:10, height:105 ,paddingRight:20}]}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={this.headerListRef}
                    data={this.mList}
                    //keyExtractor={item => "header_"+ item.title.en}
                    keyExtractor={item => "header_"+ item.title}
                    renderItem={this.renderHeaderItem}
                    contentContainerStyle={{paddingRight:20}}
                />

                <View style={styles.player}>
                    <View style={{backgroundColor: Color.BOTTOM_BG, borderRadius:15, height:200}}>
                    <Image
                    style={[styles.ccontainer, {width: windowWidth * 96 / 100, height: 160}]}
                    source={{uri:this.state.activeObj.image}}
                    imageStyle={{ borderRadius: 15, resizeMode: "cover" }}/>
                    <Slider
                        style={styles.playbackSlider}
                        minimumTrackTintColor="#fff"
                        maximumTrackTintColor="#000"
                        thumbTintColor="#fff"
                        value={this._getSeekSliderPosition()}
                        onValueChange={this._onSeekSliderValueChange}
                        onSlidingComplete={this._onSeekSliderSlidingComplete}
                        disabled={
                        !this.state.isPlaybackAllowed || this.state.isLoading
                        }
                        />
                    <View style={styles.bottomBar}>
                        <View style={styles.title}>
                            <Text style={styles.titleStyle}>{this.state.activeObj.title}</Text>
                        </View>

                        <View style={styles.controls}>
                            <TouchableOpacity style={{opacity: this.state.isLoaded ? 1 : 0.5}} onPress={() => {if(this.state.isLoaded)this.playPause()}}>
                            {this.state.isPlaying ? (
                                <Ionicons name='ios-pause' size={20} color='#fff' />
                                ) : (
                                <Ionicons name='ios-play-circle' size={20} color='#fff' />
                            )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </View>

                <FlatList
                    data={this.mList}
                    renderItem={this.renderScreen}
                    keyExtractor={item => item.title}
                    horizontal={true}
                    pagingEnabled={true}
                    scrollEnabled={false}
                    ref={this.flatListRef}
                    //onViewableItemsChanged={this.onViewableItemsChanged }
                />


            </ImageBackground>
        )
    }

}

function playMusic(card){
    console.log(card);
    Analytics.logEvent("SoundPlay", {id: card.cid, title: card.title});
    that.setState({activeObj:card, shouldPlayImmediately:true});
    that.checkSoundFile(true);
}
function addMeditationCards(group, groupIndex){
    return (
        <View style={styles.cardContainer} key={"music_card_container_" + groupIndex}>
            {
                group.map((card, index)=>( getCard(card, index, 47) ))
            }
        </View>
    )
}

function getCard(card, index, size){
    //console.log(card)
    const { lock, color, title, desc, image, url, cid } = card;
    //let src=require(source);
    return (
        <TouchableOpacity
            key={index}
            onPress={() => {
                playMusic(card);
            }}
        >
            <ImageBackground
                style={[styles.ccontainer, {width: windowWidth * size / 100, height: 300}]}
                source={{uri:image}}
                imageStyle={{ borderRadius: 15, resizeMode: "cover" }}
            >
            <View style={[styles.bottom]} intensity={40}>
                <Text style={styles.titleStyle}>
                    {title}
                </Text>
                <Text style={styles.descStyle}>
                    {desc}
                </Text>
            </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginBottom: 5
    },
    musicContainer: {
        padding: 10,
        width: windowWidth,
        flex : 1
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    backGround:{
        backgroundColor: '#280d52'
    },

    ccontainer: {
        backgroundColor: Color.MENU,
        borderRadius: 15,
        justifyContent: "flex-end",
        marginBottom: 10
    },
    lock: {
        position: "absolute",
        top: 0,
        left: 0
    },
    bottom: {
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 14,
        overflow: "hidden",
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    titleStyle: {
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 2
    },
    descStyle: {
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 11
    },
    player:{
        paddingLeft: windowWidth / 50,
        paddingRight: windowWidth / 50,
        width: windowWidth,
        height:200,
        overflow:"hidden",
        marginBottom:5
    },
    albumCover:{
        flex:1,
        zIndex:2
    },
    bottomBar:{
        position:"absolute",
        bottom:0,
        left:0,
        height:40,
        display:"flex",
        width: windowWidth * 96 / 100,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        zIndex:1,
        paddingLeft:20,
        paddingRight:20,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "cover"
    },
    playbackSlider: {
        position:'absolute',
        zIndex:35,
        top:153,
        left:20,
        opacity:1,
        width: (windowWidth * 96 / 100)-40,

      }
});


export default MusicScreen;
