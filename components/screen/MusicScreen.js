import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { MusicList } from "../../utils/Data";
import Languages, { getLanguageText } from '../../utils/Language';
import Card from '../Card';
import Title from "../Title";
import HeaderBar from "../HeaderBar";
import {LinearGradient} from "expo-linear-gradient";
import {Color} from "../../utils/Colors";
import {getMeditationGroups} from "../../utils/Utils";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class MusicScreen extends Component {

    flatListRef;
    headerListRef;
    headerLocked;
    activeIndex = 0;
    state = {
        titles: [],
        musicList : [],
    }

    constructor(props){
        super(props);
        let activeID;
        if(this.props.route.params){
            activeID = this.props.route.params.id;
        }

        MusicList.forEach((item, index) => {
            item.groups = getMeditationGroups(item.musics);
            if(activeID){
                item.groups.forEach(group => {
                    group.forEach(music => {
                        if(music.id === activeID){
                            this.activeIndex = index;
                        }
                    });
                });
            }
        })

        MusicList[this.activeIndex].active = true;

        this.flatListRef = React.createRef();
        this.headerListRef = React.createRef();
    }

    componentDidMount(){
        console.log("activeIndex: " + this.activeIndex );
        this.setState({
            musicList : MusicList
        }, ()=>{
            if(this.activeIndex > 0){
                setTimeout(()=>{
                    this.changeActiveList(this.activeIndex);
                }, 500);
            }
        })


    }

    changeActiveList = index => {
        console.log("changeActiveList with: " + index);
        MusicList.forEach((item, ind) =>{
            item.active = index === ind;
        });

        this.setState({
            musicList : MusicList
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


            MusicList.forEach((item, ind) =>{
                item.active = index === ind;
            });

            this.setState({
                musicList : MusicList
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

            <LinearGradient colors={Color.MAIN_BG_GRADIENT}>
                <HeaderBar title={getLanguageText(Languages.MUSIC)} />
                <FlatList
                    style={styles.container}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={this.headerListRef}
                    data={musicList}
                    keyExtractor={item => "header_"+ item.title.en}
                    renderItem={this.renderHeaderItem}
                />

                <FlatList
                    data={musicList}
                    renderItem={this.renderScreen}
                    keyExtractor={item => item.title.en}
                    horizontal={true}
                    pagingEnabled={true}
                    ref={this.flatListRef}
                    onViewableItemsChanged={this.onViewableItemsChanged }
                />


            </LinearGradient>
        )
    }

}

function addMeditationCards(group, groupIndex){
    const groupSize = group.length;

    if(groupSize === 1 && groupIndex === 0){
        const card = group[0];
        return (
            getCard(card, 0, 96)
        )
    }

    return (
        <View style={styles.cardContainer} key={"music_card_container_" + groupIndex}>
            {
                group.map((card, index)=>( getCard(card, index, 47) ))
            }
        </View>
    )
}

function getCard(card, index, size){
    const { lock, color, title, desc } = card;
    return (
        <Card
            key={"music_card_" + index}
            lock={lock}
            color={color}
            size={size}
            title={getLanguageText(title)}
            desc={getLanguageText(desc)}
            source={require('../../assets/images/SampleImage.jpg')}
        />
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
    }
});


export default MusicScreen;
