import {Video} from "expo-av";
import React, { Component } from "react";
import {Dimensions, StyleSheet, View, StatusBar, Platform, BackHandler } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { HomeData } from "../../utils/Data";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import {checkNetworkInfo} from "../../utils/Connection";
import { setWelcome} from "../RootNavigation";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default class WelcomeVideoScreen extends Component{

    playbackObject = null;
    componentDidMount() {
        //console.log("BackAndroid add")
        this.props.navigation.addListener('blur', this._onBlur);
        this.props.navigation.addListener('focus', this._onFocus);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
      
      componentWillUnmount() {
          this.props.navigation.removeListener('blur', this._onBlur);
          this.props.navigation.removeListener('focus', this._onFocus);
        //console.log("BackAndroid remove")
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
      _onFocus = () => {
        console.log("WelcomeVideo _onFocus");
        activateKeepAwake();
    }
    _onBlur = async  () => {
        console.log("WelcomeVideo _onBlur");
        if(this.playbackObject != null){
            await this.playbackObject.unloadAsync();
        }
        deactivateKeepAwake();
    }
      handleBackButton() {
          //console.log("back-btn")
        return true;
      }
      _handleVideoRef = component => {
        this.playbackObject = component;
        //console.log("REF! playbackObject: ", playbackObject);
        //if(this.playbackObject != null) this.playbackObject.presentFullscreenPlayer();
        
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Video source={ {uri:HomeData.STARTER.url}}  // Can be a URL or a local file.
                       rate={1.0}                                     // Store reference
                       volume={1.0}
                       isMuted={false}
                       ref={this._handleVideoRef}
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
                            if(!status.isLoaded){
                                checkNetworkInfo(true);
                                //this.props.navigation.goBack();
                            }
                           if (status.didJustFinish) {
                               console.log("video ended!");
                               HomeData.STARTER.showVideo = false;
                                setWelcome();
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
