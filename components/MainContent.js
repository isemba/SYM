import React, { Component } from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Title from "./Title";
import Languages, {getLanguageText} from "../utils/Language";
import {navigate} from "./RootNavigation";
import Card from "./Card"
import {Color} from "../utils/Colors";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class MainContent extends Component {
    render() {

        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={{ height: windowHeight *  13/ 20, paddingTop: windowHeight * 1 / 10 }} onPress={()=>{navigate("Customize")}} />

                <Title title={getLanguageText(Languages.HOW_ARE_YOU_FEELING)} />

                <Card lock={true} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.MEDITATION)} size={1} />


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container : { position: "absolute", width: windowWidth, height: windowHeight }
});
