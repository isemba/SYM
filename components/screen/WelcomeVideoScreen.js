import {Video} from "expo-av";
import React, { Component } from "react";
import {Dimensions, StyleSheet, View, StatusBar, Platform } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { HomeData } from "../../utils/Data";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default class WelcomeVideoScreen extends Component{


    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Video source={ {uri:HomeData.STARTER.url}}  // Can be a URL or a local file.
                       rate={1.0}                                     // Store reference
                       volume={1.0}
                       isMuted={false}
                       resizeMode={Video.RESIZE_MODE_CONTAIN}
                       style={styles.backgroundVideo}
                       shouldPlay={true}
                       isLooping={false}
                       orientation="landscape"
                       useNativeControls={false}
                       onFullscreenUpdate={onFullscreenUpdate}
                       onLoadStart={()=>{
                           console.log("video started!");
                       }}
                       onLoad={ status =>{
                           console.log("video loaded with status: ", status);
                       }}
                       onPlaybackStatusUpdate={ status => {
                           if (status.didJustFinish) {
                               console.log("video ended!");
                               this.props.navigation.goBack();
                           }
                       }}
                />
            </View>
        )
    }
}

const onFullscreenUpdate = async ({fullscreenUpdate}) => {
    console.log("onFullscreenUpdate");
    console.log(fullscreenUpdate);
    console.log(Platform.OS);
    if (Platform.OS === 'android') {
        switch (fullscreenUpdate) {
            case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
                await ScreenOrientation.unlockAsync()
                break;
            case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
                break;
        }
    }
};
const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(0,0,0,.5)",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    backgroundVideo: {
        //position: "absolute",
        //top: windowHeight / 3,
        left: 0,
        width: '100%',
        height: '100%'
    }
});
