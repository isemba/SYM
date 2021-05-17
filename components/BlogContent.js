import React, { useState} from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ActivityIndicator, ScrollView,ImageBackground, Platform } from 'react-native';
import { Video } from 'expo-av';
import {Color} from "../utils/Colors";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import {LinearGradient} from "expo-linear-gradient";
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import WebView from "react-native-webview";
import { HomeData } from "../utils/Data";

const windowWidth = Dimensions.get('window').width;

export default function BlogContent({route}){

    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
    let [fontLoaded] = useFonts({ Lato_400Regular});
    let videoRef;

    if(!fontLoaded){
        return <AppLoading />;
    }else {
        //console.log(route.params);
        const { uri, text, title, source } = route.params;
        const iconName = videoPlaying ? "ios-pause" : "ios-play-circle";
        
        return (
            
            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground source={Color.BG_IMAGE} style={styles.image}>
                    <View style={styles.blogContent}>                  
                    <Video
                        source={{ uri: uri.uri }}
                        posterSource={source}
                        rate={1.0}
                        volume={1.0}
                        resizeMode="cover"
                        style={{
                            width: windowWidth - 30,
                            height: 300,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }}
                        onLoad={status => {
                            //console.log("blog video loaded with status: ", status);
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
                            width: windowWidth - 30,
                            marginTop: -34
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
                                    //console.log("videoRef is null");
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
                                    //console.log("videoRef is null");
                                }
                            }}
                        />
                    </View>

                    <Text style={styles.text}>
                        Test Content
                        {text}
                    </Text>
                    </View>  
                </ImageBackground>
            </ScrollView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        alignItems: "flex-start",
        flex: 1
    },
    blogContent: {
        paddingTop:70,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:50
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "cover"   
    },
    text: {
        fontSize: 15,
        color: Color.LIGHT_TEXT_COLOR,
        fontFamily: "Lato_400Regular",
        padding: 15,
        paddingTop:30
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Color.MAIN_DARK,
        width: windowWidth - 30,
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
