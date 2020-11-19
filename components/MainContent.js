import React, { Component } from 'react';
import {Dimensions, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import Title from "./Title";
import Languages, {getLanguageText} from "../utils/Language";
import {navigate} from "./RootNavigation";
import {Color} from "../utils/Colors";
import Card from "./Card";
import MoodCard from "./MoodCard";
import {Moods} from "../utils/Data";
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../models/CustomEvents";
import { TabBarHeight } from '../utils/DeviceInfo';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const emptyArea = windowHeight *  12 / 20;

export default class MainContent extends Component {

    MoodViews = [];

    constructor(props) {
        super(props);

        Moods.forEach((item, index) => {
            this.MoodViews.push(
                <MoodCard mood={getLanguageText(item.title)} key={"mood" + index} uri={item.uri} />
            )
        })
    }


    render() {

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

                <TouchableOpacity style={{ height: emptyArea, paddingTop: windowHeight / 10 }} onPress={()=>{navigate("Customize")}} />

                <Title  title={getLanguageText(Languages.HOW_ARE_YOU_FEELING)} />

                <View style={styles.moodContainer}>
                    { this.MoodViews }
                </View>


                <Title title={getLanguageText(Languages.POPULAR)} />

                <ScrollView horizontal={true}>
                    <View style={styles.cardContainer}>
                        <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../assets/images/SampleImage.jpg')} />
                    </View>
                    <View style={styles.cardContainer}>
                        <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../assets/images/SampleImage.jpg')} />
                    </View>
                    <View style={styles.cardContainer}>
                        <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../assets/images/SampleImage.jpg')} />
                    </View>
                    <View style={styles.cardContainer}>
                        <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../assets/images/SampleImage.jpg')} />
                    </View>
                    <View style={styles.cardContainer}>
                        <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../assets/images/SampleImage.jpg')} />
                    </View>
                    
                </ScrollView>

                    <Title  title={getLanguageText(Languages.WORD_OF_THE_DAY)} />

                    <View style={styles.cardContainer}>
                        <Card isSquare={true} size={96} source={require('../assets/images/deneme.png')} />
                    </View>

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
