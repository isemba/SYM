import React, { useState} from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ActivityIndicator, Button } from 'react-native';
import { Video } from 'expo-av';
import {Color} from "../utils/Colors";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import {LinearGradient} from "expo-linear-gradient";
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import WebView from "react-native-webview";

const windowWidth = Dimensions.get('window').width;

export default function BlogContent({route}){

    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
    let [fontLoaded] = useFonts({ Lato_400Regular});
    let videoRef;

    if(!fontLoaded){
        return <AppLoading />;
    }else {
        const { uri, text, title } = route.params;
        const iconName = videoPlaying ? "ios-pause" : "ios-play-circle";

        return (
            <LinearGradient style={styles.container} colors={Color.MAIN_BG_GRADIENT}>
                <SafeAreaView style={{ alignItems: "center" }}>
                    {!videoLoaded ? <View style={styles.indicator}><ActivityIndicator /></View> : null }
                    <Video
                        source={{ uri }}
                        rate={1.0}
                        volume={1.0}
                        resizeMode="cover"
                        style={{
                            width: windowWidth - 30,
                            height: 300,
                            borderRadius: 10
                        }}
                        onLoad={status => {
                            console.log("blog video loaded with status: ", status);
                            setVideoLoaded(true);
                        }}
                        ref={ comp => {
                            videoRef = comp;
                            if(videoRef != null){
                                videoRef.setOnPlaybackStatusUpdate( async status =>{
                                    if (status.didJustFinish) {
                                        await videoRef.stopAsync();
                                        setVideoPlaying(false);
                                    }
                                })
                            }
                        }}
                    />

                    <View
                        style={{
                            alignItems: "flex-end",
                            width: windowWidth - 40,
                            marginTop: -29
                        }}
                    >
                        <Ionicons
                            name="ios-expand"
                            size={30}
                            color={Color.LIGHT_TEXT_COLOR}
                            onPress={async ()=>{
                                if(videoRef != null){
                                    try {
                                        await videoRef.presentFullscreenPlayer();
                                    }catch (e){

                                    }

                                }else {
                                    console.log("videoRef is null");
                                }
                            }}

                        />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Ionicons
                            name={iconName}
                            size={30}
                            color={Color.LIGHT_TEXT_COLOR}
                            onPress={async ()=>{
                                if(videoRef != null){
                                    try {
                                        if(videoPlaying){
                                            await videoRef.pauseAsync();
                                            setVideoPlaying(false);
                                        } else {
                                            await videoRef.playAsync();
                                            setVideoPlaying(true);
                                        }
                                    }catch (e){

                                    }

                                }else {
                                    console.log("videoRef is null");
                                }
                            }}
                        />
                    </View>

                    <Text style={styles.text}>
                        {text}
                    </Text>
                </SafeAreaView>
            </LinearGradient>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1
    },
    text: {
        fontSize: 15,
        color: Color.LIGHT_TEXT_COLOR,
        fontFamily: "Lato_400Regular",
        padding: 15,
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Color.MAIN_DARK,
        width: windowWidth - 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    title: {
        fontSize: 16,
        color: Color.LIGHT_TEXT_COLOR,
        fontFamily: "Lato_400Regular",
        marginRight: 20
    },
    indicator: { alignItems: "center", justifyContent: "center", width: windowWidth - 30, height: 300  }
});
