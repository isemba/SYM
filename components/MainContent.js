import React, { Component } from 'react';
import {Dimensions, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
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
import {AppLoading} from "expo";
import {MediaType} from "../utils/EnumTypes";


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

    componentDidMount() {
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
                        source={{ uri: item.url }}
                        size={55}
                    />
                </View>
            )
        })

        HomeData.DISCOVER.forEach((item, index) => {
            this.DiscoverViews.push(
                <View style={styles.cardContainer} key={"discover_"+ index}>
                    <Card lock={false} color={Color.MENU} title={item.title} desc={getLanguageText(Languages.DISCOVER)} source={{ uri: item.url }} />
                </View>
            )
        });

        HomeData.MUSIC.forEach((item, index) => {
            this.MusicViews.push(
                <View style={styles.cardContainer} key={"music_"+ index}>
                    <Card lock={false} color={Color.MENU} title={item.title} source={{ uri: item.url }} id={item.id} media={MediaType.MUSIC} />
                </View>
            )
        });

        HomeData.BLOG.forEach((item, index) => {
            this.BlogViews.push(
                <View style={styles.cardContainer} key={"blog_"+ index}>
                    <Card lock={false} color={Color.MENU} title={item.title} source={{ uri: item.url }} />
                </View>
            )
        });

        this.setState({
            initialized : true
        })

        EventEmitter.on(CustomEvents.THEME_SELECTED, themeIndex =>{
            console.log("Main Content THEME_SELECTED")
            this.setState({
                themeIndex
            })
        })
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
    }
});
