import React, { Component } from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {Color} from "../utils/Colors";
import {navigate} from "./RootNavigation";
import {useFonts, Lato_400Regular, Lato_300Light} from "@expo-google-fonts/lato";
import AppLoading from "expo-app-loading";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function MoodCard({mood, uri}){
    let [fontLoaded] = useFonts({ Lato_400Regular, Lato_300Light});

    console.log("MOOD CARD RENEDER: " + mood);

    if(!fontLoaded){
        return <AppLoading />;
    }else {
        return (
            <TouchableWithoutFeedback
                onPress={()=>{
                    navigate("Video", { uri });
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>{mood}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Color.MOOD_BG,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth * 9 / 40,
        height: windowWidth * 9 / 80,
        marginBottom: 10,
        paddingHorizontal: 5
    },
    text: {
        color: Color.LIGHT_TEXT_COLOR,
        fontFamily: "Lato_300Light",
        fontSize: 14,
        textAlign: 'center'

    }
});
