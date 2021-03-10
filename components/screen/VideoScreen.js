import {Video} from "expo-av";
import React, { Component } from "react";
import {Dimensions, StyleSheet, View, StatusBar, Platform } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import * as axios from "axios";
import {UPDATE_URL} from "../../environement";
import {HomeData} from "../../utils/Data";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default class VideoScreen extends Component{

    constructor(props){
        console.log(props);
        super(props);
        //useKeepAwake();
    }

    statusSent = false;

    componentDidMount(){
        this.props.navigation.addListener('blur', this._onBlur);
        this.props.navigation.addListener('focus', this._onFocus);

    }
    _onFocus = () => {
        console.log("Video _onFocus");
        activateKeepAwake();
    }
    _onBlur = () => {
        console.log("_onBlur");
        deactivateKeepAwake();
    }

    sendStatusUpdate = (cid, dur) =>{
        axios.post(
            UPDATE_URL,
            { cid, dur },
            {
                headers: {
                    'authorization': `Bearer ${HomeData.TOKEN}`
                }
            }
            );
    }

    render() {

        const { route } = this.props;
        if(!route) return null;
        const {  params: { uri, cid } } = route;

        let statusSent = false;

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Video source={{ uri }}  // Can be a URL or a local file.
                       rate={1.0}                                     // Store reference
                       volume={1.0}
                       isMuted={false}
                       resizeMode={Video.RESIZE_MODE_CONTAIN}
                       style={styles.backgroundVideo}
                       shouldPlay={true}
                       isLooping={false}
                       orientation="landscape"
                       useNativeControls={true}
                       onFullscreenUpdate={onFullscreenUpdate}
                       onLoadStart={()=>{
                           console.log("video started!");
                       }}
                       onLoad={ status =>{
                           console.log("video loaded with status: ", status);
                       }}
                       onPlaybackStatusUpdate={ status => {
                           console.log("status", status);
                           if(this.statusSent || !status.isPlaying) return;

                           if(status.durationMillis === 0) return;

                           if(status.positionMillis / status.durationMillis > 0.9){
                               this.statusSent = true;
                               this.sendStatusUpdate(cid, status.durationMillis);
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
