import React, { Component, useState } from 'react';
import {Dimensions, ScrollView, StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import Title from "./Title";
import Languages, {getLanguageText} from "../utils/Language";
import {navigate} from "./RootNavigation";
import {Color} from "../utils/Colors";
import Card from "./Card";
import MoodCard from "./MoodCard";
import {Moods, HomeData} from "../utils/Data";
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../models/CustomEvents";
import { TabBarHeight } from '../utils/DeviceInfo';
import AppLoading from "expo-app-loading";
import {MediaType} from "../utils/EnumTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Video} from "expo-av";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const clickArea = windowHeight *  2 / 20;
const emptyArea = windowHeight *  10 / 20;


export default class MainContent extends Component {

    MoodViews = [];
    PopularViews = [];
    DiscoverViews = [];
    MusicViews = [];
    BlogViews = [];


    state = {
        initialized : false,
        themeIndex: 0
    }

    async componentDidMount() {
        that=this;
        try {
            const value = await AsyncStorage.getItem('@first')
            if(value !== null) {
              // value previously stored
              console.log("shown before");
            }else{
                console.log('show welcome');
                setTimeout(function(){
                that.setState({
                    showWelcome : true
                })}, 3000);
            }
          } catch(e) {
            // error reading value
            console.log("local storage error")
          }
        Moods.forEach((item, index) => {
            this.MoodViews.push(
                <MoodCard mood={getLanguageText(item.title)} key={"mood" + index} uri={item.uri} />
            )
        });

        HomeData.POPULAR.forEach((item, index) => {
            this.PopularViews.push(
                <View style={styles.cardContainer} key={"popular_"+ index}>
                    <Card
                        lock={false}
                        color={Color.MENU}
                        title={item.title}
                        desc={item.desc}
                        source={{ uri: item.image }}
                        uri={item.url}
                        id={item.cid}
                        size={55}
                    />
                </View>
            )
        })

        HomeData.DISCOVER.forEach((item, index) => {
            this.DiscoverViews.push(
                <View style={styles.cardContainer} key={"discover_"+ index}>
                    <Card lock={false}
                        color={Color.MENU}
                        title={item.title}
                        desc={getLanguageText(Languages.DISCOVER)}
                        source={{ uri: item.image }}
                        uri={item.url}
                        id={item.cid}/>
                </View>
            )
        });

        HomeData.MUSIC.forEach((item, index) => {
            this.MusicViews.push(
                <View style={styles.cardContainer} key={"music_"+ index}>
                    <Card lock={false} color={Color.MENU} title={item.title} source={{ uri: item.image }} id={item.id} media={MediaType.MUSIC} target={item}/>
                </View>
            )
        });

        HomeData.BLOG.forEach((item, index) => {
            this.BlogViews.push(
                <View style={styles.cardContainer} key={"blog_"+ index}>
                    <Card lock={false} color={Color.MENU} title={item.title} source={{ uri: item.image }} media={MediaType.HOME_BLOG} target={item}/>
                </View>
            )
        });

        this.setState({
            initialized : true
        })

        EventEmitter.on(CustomEvents.THEME_SELECTED, this.updateTheme)
    }

    componentWillUnmount() {
        EventEmitter.off(CustomEvents.THEME_SELECTED, this.updateTheme);
    }

    updateTheme = (themeIndex) => {
        console.log("Main Content THEME_SELECTED")
        this.setState({
            themeIndex
        })
    }



    showWelcomeVideo(){
        if(this.state.showWelcome){
        return (
            <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
            <View style={styles.welcomeVideo}>
            <Video source={{uri:'https://sahajayoga-assets.s3-eu-west-1.amazonaws.com/mantra/013-mm1.mp4'}}  // Can be a URL or a local file.
                rate={1.0}                                     // Store reference
                volume={1.0}
                isMuted={false}
                resizeMode={Video.RESIZE_MODE_COVER}
                style={styles.video}
                shouldPlay={true}
                isLooping={false}
                orientation="landscape"
                useNativeControls={true}
                onLoadStart={()=>{
                    console.log("video started!");
                }}
                onLoad={ status =>{
                    console.log("video loaded with status: ", status);
                }}
                onPlaybackStatusUpdate={ status => {
                    //console.log(status)
                    if (status.didJustFinish) {
                        console.log("video ended!");
                        setTimeout(function(){
                            that.setState({
                                showWelcome : false
                            })}, 1000);
                      }
                }}
            />
        </View></Modal>)
        }
    }
    render() {
        console.log("themeIndex: "+ this.state.themeIndex);

        if(!this.state.initialized){
            return <AppLoading />;
        }

        return (
            <ScrollView
                style={styles.container}
                scrollEventThrottle={1}
                onScroll={ event =>{
                    if(event == null || event.nativeEvent == null) return;

                    const { contentOffset } = event.nativeEvent;
                    const ratio = contentOffset.y / emptyArea;

                    EventEmitter.emit(CustomEvents.BG_RATIO_CHANGED, ratio );

                }}
            >

                <TouchableOpacity style={{ height: clickArea, paddingTop: windowHeight / 10 }} onPress={()=>{navigate("Customize")}} />
                <View style={{ height: emptyArea, paddingTop: windowHeight / 10 }}/>

                <Title  title={getLanguageText(Languages.HOW_ARE_YOU_FEELING)} />

                <View style={styles.moodContainer}>
                    { this.MoodViews }
                </View>


                <Title title={getLanguageText(Languages.POPULAR)} />

                <ScrollView horizontal={true}>
                    { this.PopularViews }
                </ScrollView>

                <Title  title={getLanguageText(Languages.WORD_OF_THE_DAY)} />

                <View style={styles.cardContainer}>
                    <Card isSquare={true} size={96} source={{ uri: HomeData.TODAY  }} />
                </View>

                <Title title={getLanguageText(Languages.DISCOVER)} />

                <ScrollView horizontal={true}>
                    { this.DiscoverViews }
                </ScrollView>

                <Title title={getLanguageText(Languages.MUSIC)} />

                <ScrollView horizontal={true}>
                    { this.MusicViews }
                </ScrollView>

                <Title title={getLanguageText(Languages.BLOG)} />

                <ScrollView horizontal={true}>
                    { this.BlogViews }
                </ScrollView>


                { this.showWelcomeVideo() }
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    container : {
        position: "absolute",
        width: windowWidth,
        height: windowHeight - TabBarHeight,
        paddingHorizontal: windowWidth / 50
    },
    moodContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    cardContainer:{
        marginRight: 10
    },
    welcomeVideo:{
        width:windowWidth,
        height: windowHeight - TabBarHeight,
        zIndex:10,
        flex:1,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"rgba(0,0,0,.5)"
    },
    video:{
        position: "absolute",
        top: windowHeight / 3,
        left: 0,
        width: windowWidth,
        height: windowHeight / 3
    }
});
