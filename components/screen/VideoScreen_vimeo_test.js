import {Video} from "expo-av";
import React, { Component } from "react";
import {Dimensions, StyleSheet, View, StatusBar, Platform, Button } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import * as axios from "axios";
import {UPDATE_URL} from "../../environement";
import {HomeData} from "../../utils/Data";
import * as Analytics from "expo-firebase-analytics";
import {checkNetworkInfo} from "../../utils/Connection";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


//let playbackObject = null;
export default class VideoScreen extends Component{

    constructor(props){
        console.log(props);
        super(props);
        //useKeepAwake();
        that = this;
        this.state={
            videoUrl:""
        }
    }

    fullScreen = false;
    statusSent = false;
    playbackObject = null;

    componentDidMount(){
        this.props.navigation.addListener('blur', this._onBlur);
        this.props.navigation.addListener('focus', this._onFocus);

        ScreenOrientation.addOrientationChangeListener(this._onOrientationChange);
        console.log("axios")
        axios.get('https://player.vimeo.com/video/542790320/config')
        .then(function (res) { 
            console.log("response");
            console.log(res.data.request.files);
            that.setState({
          thumbnailUrl: res.data.video.thumbs['640'],
          videoUrl: res.data.request.files.progressive[0].url,
          //video: res.data.video,
        });
        console.log(that.state)
    });
        //console.log(this.state)
        
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('blur', this._onBlur);
        this.props.navigation.removeListener('focus', this._onFocus);

        ScreenOrientation.removeOrientationChangeListeners();
    }

    _handleVideoRef = component => {
        this.playbackObject = component;
        //console.log("REF! playbackObject: ", playbackObject);
        //if(this.playbackObject != null) this.playbackObject.presentFullscreenPlayer();
        
    }

    _onFocus = () => {
        console.log("Video _onFocus");
        checkNetworkInfo(true);
        activateKeepAwake();
    }
    _onBlur = async  () => {
        console.log("_onBlur");
        if(this.playbackObject != null){
            if(this.playbackObject.isPlaying)await this.playbackObject.stopAsync();
            await this.playbackObject.unloadAsync();
            console.log("unloaded successfully");
        }

        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        deactivateKeepAwake();
    }

    _onOrientationChange = ({orientationInfo}) => {
        console.log("_onOrientationChange change to: ", orientationInfo);
    }

    sendStatusUpdate = async (cid, dur) =>{
        console.log("sendStatusUpdate")
        console.log(cid, dur)
        Analytics.logEvent("VideoComplete", {"id": cid});
        axios.post(
            UPDATE_URL,
            { cid, dur },
            {
                headers: {
                    'authorization': `Bearer ${HomeData.TOKEN}`
                }
            }
            ).then(function (response) {
                console.log(response);
                /*setTimeout(function(){                
                    if(playbackObject != null) playbackObject.dismissFullscreenPlayer()
                    that.props.navigation.goBack();
                }, 2000)*/
              }).catch(function (error) {
                console.log(error);
              });
    }

    render() {

        const { route } = this.props;
        if(!route) return null;
        const {  params: { uri, id } } = route;

        console.log("route: ", route);
        if(this.state.videoUrl == ""){
            return <View></View>;
        }else{
        return (
            
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Video source={{ uri:this.state.videoUrl }}  // Can be a URL or a local file.
                       rate={1.0}                                     // Store reference
                       volume={1.0}
                       isMuted={false}
                       ref={this._handleVideoRef}
                       resizeMode={Video.RESIZE_MODE_CONTAIN}
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
                           if(this.playbackObject != null) this.playbackObject.presentFullscreenPlayer();
                       }}
                       onPlaybackStatusUpdate={ status => {
                           //console.log("status", status);
                           if(!status.isLoaded) checkNetworkInfo(true);
                           if(this.statusSent || !status.isPlaying) return;

                           if(status.durationMillis === 0) return;
                           // console.log(status.didJustFinish)
                           /*if (status.didJustFinish) {
                                console.log("video ended!");
                                if(playbackObject != null) playbackObject.dismissFullscreenPlayer()
                                this.props.navigation.goBack();
                            }
                           if(status.positionMillis / status.durationMillis > 0.9 && !this.statusSent){
                               this.statusSent = true;                               
                               this.sendStatusUpdate(id, status.durationMillis);
                           }*/
                           if(status.positionMillis / status.durationMillis > 0.6 && !this.statusSent){
                            //console.log("video ended!");
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
}

const onFullscreenUpdate = async ({fullscreenUpdate}) => {

    switch (fullscreenUpdate) {
        case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
            break;
        case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            break;
    }

};
const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(0,0,0,.2)",
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
