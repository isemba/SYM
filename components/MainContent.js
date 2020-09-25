import React, { Component } from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Title from "./Title";
import Languages, {getLanguageText, MoodLanguages} from "../utils/Language";
import {navigate} from "./RootNavigation";
import {Color} from "../utils/Colors";
import Card from "./Card";
import MoodCard from "./MoodCard";
import Moods from "../utils/Moods";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class MainContent extends Component {

    MoodViews = [];

    constructor(props) {
        super(props);

        Moods.forEach((item, index) => {
            this.MoodViews.push(
                <MoodCard mood={getLanguageText(item)} key={"mood" + index} />
            )
        })
    }


    render() {

        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={{ height: windowHeight *  5/ 20, paddingTop: windowHeight / 10 }} onPress={()=>{navigate("Customize")}} />

                <Title title={getLanguageText(Languages.HOW_ARE_YOU_FEELING)} />

                <View style={styles.moodContainer}>
                    { this.MoodViews }
                </View>


                <Title title={getLanguageText(Languages.POPULAR)} />

                <ScrollView horizontal={true}>
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.MEDITATION)} source={require('../assets/images/SampleImage.jpg')} />
                    <Card lock={true} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.MEDITATION)} source={require('../assets/images/SampleImage.jpg')}/>
                    <Card lock={true} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.MEDITATION)} source={require('../assets/images/SampleImage.jpg')}/>
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.MEDITATION)} source={require('../assets/images/SampleImage.jpg')}/>
                    <Card lock={true} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.MEDITATION)} source={require('../assets/images/SampleImage.jpg')}/>
                    <Card lock={true} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.MEDITATION)} source={require('../assets/images/SampleImage.jpg')}/>
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.MEDITATION)} source={require('../assets/images/SampleImage.jpg')}/>
                    <Card lock={true} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.MEDITATION)} source={require('../assets/images/SampleImage.jpg')}/>
                    <Card lock={true} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.MEDITATION)} source={require('../assets/images/SampleImage.jpg')}/>
                </ScrollView>



            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        position: "absolute",
        width: windowWidth,
        height: windowHeight - 50,
        paddingHorizontal: windowWidth / 50
    },
    moodContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }
});
