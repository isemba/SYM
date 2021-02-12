import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View, FlatList, TouchableOpacity, ImageBackground, Text, Image } from 'react-native';
import { MusicList, HomeData } from "../../utils/Data";
import Languages, { getLanguageText } from '../../utils/Language';
import Card from '../Card';
import Title from "../Title";
import HeaderBar from "../HeaderBar";
import {LinearGradient} from "expo-linear-gradient";
import {Color} from "../../utils/Colors";
import {getMeditationGroups} from "../../utils/Utils";
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var musicList;
const sound = new Audio.Sound();
class MusicScreen extends Component {

    flatListRef;
    headerListRef;
    headerLocked;
    activeIndex = 0;
    
    

    constructor(props){
        super(props);
        console.log("props >>>")
        if(props.route.params != null && props.route.params != undefined) console.log(props.route.params.target);
        let activeID;
        //console.log(HomeData.MUSIC)
        /*MusicList = HomeData.MUSIC;
        console.log(MusicList);*/

        var tmObj;
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
            soundDuration: null
        }
        let ml = MusicList;
        let hd =  HomeData.MUSIC;

        ml.forEach((item) => {
            item.musics = [];
            item.groups=[];
            let t1 = item.title.en.split(' ')[0];
            let t2 = item.title.tr.split(' ')[0];
            let t3 = item.title.en.split(' ')[0].toLowerCase();
            let t4 = item.title.tr.split(' ')[0].toLowerCase();
            //console.log(item.title);
            hd.forEach((m) => {
                /*console.log(">>>")
                console.log(m.url);
                console.log(t1);
                console.log(t2);
                console.log(t3);
                console.log(t4);
                console.log("***")*/

                if(m.url.indexOf(t1) > 0 || m.url.indexOf(t2) > 0 || m.url.indexOf(t3) > 0 || m.url.indexOf(t4) > 0) item.musics.push(m)
            });


        });
        var filtered = ml.filter(function(el) { return el.musics.length > 0; });

        musicList = filtered;
        if(this.props.route.params){
            activeID = this.props.route.params.target.cid;
        }
        

        musicList.forEach((item, index) => {
            item.groups = getMeditationGroups(item.musics);
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
        var tmObj;
        if(this.state.activeObj.url == ""){
            tmObj = musicList[this.activeIndex].musics[0];
        }else{
            tmObj = this.state.activeObj;
        }
        this.setState({
            musicList : musicList,
            activeObj:tmObj
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
    _onBlur = () => {
        console.log("navigate away");
        this.checkSoundFile(false);
    }
    async checkSoundFile(load){
        console.log("checkSoundFile "+load);
        if(that.state.isPlaying){
            await sound.stopAsync().then(()=> that.unloadSound(load))            
        }else if(that.state.hasSoundLoaded){
            that.unloadSound(load)
        }else{
            that.loadSound()
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
        console.log("load playing? "+that.state.isPlaying)
        await sound.loadAsync({uri:that.state.activeObj.url}).then((status)=>{
            that.setState({isLoaded:true, hasSoundLoaded:true});
        });   
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
        musicList.forEach((item, ind) =>{
            item.active = index === ind;
        });

        this.setState({
            musicList : musicList
        });

       try {
           this.flatListRef.current.scrollToIndex({index});

           this.headerListRef.current.scrollToIndex({index});
           this.headerLocked = true;

           setTimeout(()=>{
               this.headerLocked = false;
           }, 250);

       }catch (e){

       }
    };

    renderHeaderItem = ({item, index}) => (
        
        <Title
            title={getLanguageText(item.title)}
            active={item.active}
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
       // console.log("Changed in this iteration", changed);

        if(!viewableItems || viewableItems.length == 0) return;

        const index = viewableItems[0].index;

        if(this.headerListRef != null){


            musicList.forEach((item, ind) =>{
                item.active = index === ind;
            });

            this.setState({
                musicList : musicList
            });

            if(!this.headerLocked){
                this.headerListRef.current.scrollToIndex({index});
            }

        }


    }

    render() {
        //let { id } = this.props.route.params;

        const { musicList } = this.state;
        return (

            <ImageBackground source={Color.BG_IMAGE} style={styles.image}>
                <HeaderBar title={getLanguageText(Languages.MUSIC)} />
                <FlatList
                    style={[styles.container, {marginBottom:10, height:70}]}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={this.headerListRef}
                    data={musicList}
                    keyExtractor={item => "header_"+ item.title.en}
                    renderItem={this.renderHeaderItem}
                />

                <View style={styles.player}>
                    <View style={{backgroundColor: Color.BOTTOM_BG, borderRadius:15, height:200}}>
                    <Image
                    style={[styles.ccontainer, {width: windowWidth * 96 / 100, height: 160}]}
                    source={{uri:this.state.activeObj.image}}
                    imageStyle={{ borderRadius: 15, resizeMode: "cover" }}/>
                    <View style={styles.bottomBar}>
                        <View style={styles.title}>
                            <Text style={styles.titleStyle}>{this.state.activeObj.title}</Text>
                        </View>
                        <View style={styles.controls}>
                            <TouchableOpacity style={styles.control, {opacity: this.state.isLoaded ? 1 : 0.5}} onPress={() => {if(this.state.isLoaded)this.playPause()}}>
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
                    data={musicList}
                    renderItem={this.renderScreen}
                    keyExtractor={item => item.title.en}
                    horizontal={true}
                    pagingEnabled={true}
                    ref={this.flatListRef}
                    onViewableItemsChanged={this.onViewableItemsChanged }
                />


            </ImageBackground>
        )
    }

}

function playMusic(card){
    console.log(card);
    that.setState({activeObj:card});
    that.checkSoundFile(true);
}
function addMeditationCards(group, groupIndex){
    /*const groupSize = group.length;

    if(groupSize === 1 && groupIndex === 0){
        const card = group[0];
        return (
            getCard(card, 0, 96)
        )
    }*/

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
        paddingHorizontal: windowWidth / 50,
        marginBottom: 5
    },
    musicContainer: {
        padding: windowWidth / 50,
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
    }
});


export default MusicScreen;
