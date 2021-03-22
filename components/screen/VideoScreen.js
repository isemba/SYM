import {Video} from "expo-av";
import React, { Component } from "react";
import {Dimensions, StyleSheet, View, StatusBar, Platform, Button } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import * as axios from "axios";
import {UPDATE_URL} from "../../environement";
import {HomeData} from "../../utils/Data";
import * as Analytics from "expo-firebase-analytics";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


let playbackObject = null;
export default class VideoScreen extends Component{

    constructor(props){
        console.log(props);
        super(props);
        //useKeepAwake();
    }

    fullScreen = false;
    statusSent = false;

    componentDidMount(){
        this.props.navigation.addListener('blur', this._onBlur);
        this.props.navigation.addListener('focus', this._onFocus);

        ScreenOrientation.addOrientationChangeListener(this._onOrientationChange);
    }

    componentWillUnmount() {
        ScreenOrientation.removeOrientationChangeListeners();
    }

    _handleVideoRef = component => {
        playbackObject = component;
        console.log("REF! playbackObject: ", playbackObject);
    }

    _onFocus = () => {
        console.log("Video _onFocus");
        activateKeepAwake();
    }
    _onBlur = async  () => {
        console.log("_onBlur");
        if(playbackObject != null){
            await playbackObject.unloadAsync();
        }

        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        deactivateKeepAwake();
    }

    _onOrientationChange = ({orientationInfo}) => {
        console.log("_onOrientationChange change to: ", value);
    }

    sendStatusUpdate = (cid, dur) =>{
        Analytics.logEvent("VideoComplete", {"id": cid});
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
        const {  params: { uri, id } } = route;

        console.log("route: ", route);

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Video source={{ uri }}  // Can be a URL or a local file.
                       rate={1.0}                                     // Store reference
                       volume={1.0}
                       isMuted={false}
                       ref={this._handleVideoRef}
                       resizeMode={Video.RESIZE_MODE_COVER}
                       style={Platform.OS === 'android' ? styles.androidBackgroundVideo : styles.iosBackgroundVideo}
                       shouldPlay={true}
                       isLooping={false}
                       useNativeControls={true}
                       onFullscreenUpdate={onFullscreenUpdate}
                       onLoadStart={()=>{
                           console.log("video started!");
                       }}
                       onLoad={ async status =>{
                           console.log("video loaded with status: ", status);
                           Analytics.logEvent("VideoLoaded", {id});
                       }}
                       onPlaybackStatusUpdate={ status => {
                           console.log("status", status);
                           if(this.statusSent || !status.isPlaying) return;

                           if(status.durationMillis === 0) return;

                           if(status.positionMillis / status.durationMillis > 0.9){
                               this.statusSent = true;
                               this.sendStatusUpdate(id, status.durationMillis);
                           }
                       }}
                />

                {/*<View style={styles.buttons}>*/}
                {/*    <Button*/}
                {/*        title={'vido'}*/}
                {/*    />*/}
                {/*</View>*/}
            </View>
        )
    }
}

const onFullscreenUpdate = async ({fullscreenUpdate}) => {

    switch (fullscreenUpdate) {
        case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
            break;
        case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            break;
    }

};
const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(0,0,0,.5)",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    androidBackgroundVideo: {
        left: 0,
        width: '100%',
        height: '100%'
    },
    iosBackgroundVideo: {
        left: 0,
        top: windowHeight / 3,
        width: windowWidth,
        height: windowHeight / 3
    }
});
