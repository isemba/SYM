import { View, StyleSheet, Image, Dimensions,SafeAreaView, Platform } from "react-native";
import React, {Component} from "react";
import Logo from "../Logo";
import MainContent from "../MainContent";
import MainBG from "./MainBG";
import { Video } from "expo-av";
import MenuIcon from "./MenuIcon";
import {Color, ColorSettings} from "../../utils/Colors";
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../../models/CustomEvents";
import {HomeData} from "../../utils/Data";
import {navigationRef} from "../RootNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HomeScreen extends Component{
    state = {
        bg: "",
        blurred:false
    };

    constructor(){
        super();
        this.bgVideo = null;
        that = this;
        
    }
    componentDidMount() {
        console.log("home did mount");
        this.setState({
            bg:HomeData.THEMES[ColorSettings.SelectedTheme].bg
        })
        EventEmitter.on(CustomEvents.THEME_SELECTED, this.updateTheme);
        

        this.props.navigation.addListener('focus', this._onFocus);
        this.props.navigation.addListener('blur', this._onBlur);
        //console.log(this.bgVideo)     
        //this.checkBgVideo();
    }
    _onFocus = () => {
        console.log("Home _onFocus");
        this.setState({blurred:false});
        EventEmitter.emit(CustomEvents.PLAY_BG);

        //if(Platform.OS === 'ios') this.checkBgVideo();
        var f = this.checkBgVideo;
        setTimeout(function(){
            f();
        }, 500)
        const bgvolume = AsyncStorage.setItem('@bgvolume', HomeData.BG_MUSIC.volume.toString())
            
    }
    _onBlur = () => {
        console.log("Home _onBlur");
        /*console.log(navigationRef)
        console.log(navigationRef.current);
        console.log(navigationRef.current?.getCurrentRoute);
        console.log(navigationRef.current?.getCurrentRoute());*/
        this.setState({blurred:true}, function(){
            this.bgVideo.stopAsync();
        });
        

        if(navigationRef.current?.getCurrentRoute().name != "Customize")
        EventEmitter.emit(CustomEvents.MEDIA_ACTIVE);
    }
    checkBgVideo = async () => {
        if(this.bgVideo != null) {
            var stat= await this.bgVideo.getStatusAsync();
            console.log("stat >>> ")
            console.log(stat);
            if(!stat.isLoaded){
                console.log("source: "+this.state.bg);
                await this.bgVideo.loadAsync({uri:this.state.bg});
                this.bgVideo.setStatusAsync({ isLooping: true });
                this.bgVideo.playAsync();
            }else{
                this.bgVideo.setStatusAsync({ isLooping: true });
                this.bgVideo.playAsync();
            }
        }
    }
    componentWillUnmount() {
        console.log("home will unmount");
        this.props.navigation.removeListener('focus', this._onFocus);
        this.props.navigation.removeListener('blur', this._onBlur);

        /*if(navigationRef.current?.getCurrentRoute().name != "Customize")
        EventEmitter.emit(CustomEvents.MEDIA_ACTIVE);*/

        if(navigationRef.current?.getCurrentRoute().name != "Customize")
        EventEmitter.emit(CustomEvents.MEDIA_ACTIVE);
        EventEmitter.off(CustomEvents.THEME_SELECTED, this.updateTheme);
    }

    updateTheme = themeIndex => {
        console.log("Main Content THEME_SELECTED")
        this.setState({
            bg:HomeData.THEMES[themeIndex].bg
        })
    }
    _handleVideoRef = component => {
        this.bgVideo = component;
        //console.log("this.bgVideo >>>")
        //console.log(this.bgVideo._nativeRef)
      }
      playVideo = ()=>{
        this.bgVideo.playAsync();
      }
    render(){
    return (
        <View style={{ flex: 1 }}>

            <Video source={{uri:this.state.bg}}  // Can be a URL or a local file.
                rate={1.0}                                     // Store reference
                volume={1.0}
                isMuted={true}
                resizeMode={Video.RESIZE_MODE_COVER}
                style={styles.backgroundVideo}
                shouldPlay={false}
                isLooping={false}
                orientation="portrait"
                useNativeControls={false}
                ref={this._handleVideoRef}
                onLoadStart={() => {
                    console.log("bg video started!");
                }}
                onLoad={status => {
                   console.log("bg video loaded with status: ", status);
                   //console.log(this.bgVideo);
                   this.bgVideo.setStatusAsync({ isLooping: true });
                   this.bgVideo.playAsync();
                }}
                onPlaybackStatusUpdate={ status => {
                    /*console.log(status);*/
                    // if(!status.isLoaded && !status.isPlaying){
                    //     console.log("load fail")
                    // }
                    //console.log(status);
                    if(Platform.OS == "android" && status.isLoaded && !status.isPlaying && !this.state.blurred){
                        console.log("not playing");
                        this.playVideo();
                    }
                }}
            />

            
            <SafeAreaView>
                <View style={{display:'flex'}}>
                    
                    <View style={styles.logoContainer}>
                        <Logo />
                    </View>
                    {/* <MenuIcon navigateTo={"Customize"}/> */}
                </View>

                <MainBG />
            
                <MainContent />
            </SafeAreaView>
            
        </View>
    );
            }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: windowWidth,
        height: windowHeight
    },
    logoContainer: {
        paddingTop: 0,
        alignItems: "center",
    }
});
