import React, { useState, useEffect } from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {Color} from "../utils/Colors";
import {navigate, setWelcome} from "./RootNavigation";
import {useFonts, Lato_400Regular, Lato_300Light} from "@expo-google-fonts/lato";
import AppLoading from "expo-app-loading";
import { HomeData } from "../utils/Data";
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../models/CustomEvents";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function MoodCard({mood, uri}){
    let [fontLoaded] = useFonts({ Lato_400Regular, Lato_300Light});

    //console.log("MOOD CARD RENEDER: " + mood);
    const [bgColor, changeBgColor] = useState(Color.MOOD_BG);
    const updateTheme = themeIndex => {
        console.log("Mood Card THEME_SELECTED")

        changeBgColor(Color.MOOD_BG);
        console.log(Color.MOOD_BG);
        console.log(bgColor);
    }
    useEffect(() => {
        EventEmitter.on(CustomEvents.THEME_SELECTED, updateTheme);

        return () => {
            EventEmitter.off(CustomEvents.THEME_SELECTED, updateTheme);
        };
    }, [updateTheme]);

    if(!fontLoaded){
        return <AppLoading />;
    }else {
        return (
            <TouchableWithoutFeedback
                onPress={()=>{
                    if(HomeData.STARTER.showVideo){
                        HomeData.STARTER.showVideo = false;
                        setWelcome();
                        navigate('WelcomeVideo');
                    } else {
                        navigate("Video", { uri });
                    }

                }}
            >
                <View style={[styles.container, {backgroundColor: bgColor}]}>
                    <Text style={styles.text}>{mood}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth * 12 / 40,
        height: windowWidth * 9 / 80,
        marginBottom: 10,
        paddingHorizontal: 5
    },
    text: {
        color: Color.LIGHT_TEXT_COLOR,
        fontFamily: "Lato_400Regular",
        fontSize: 14,
        textAlign: 'center'
    }
});
