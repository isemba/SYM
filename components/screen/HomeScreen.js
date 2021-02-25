import { View, StyleSheet, Image, Dimensions } from "react-native";
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HomeScreen extends Component{
    state = {
        bg:HomeData.THEMES[0].bg
    };

    componentDidMount() {
        console.log("Homescreen colorsettings")
        console.log(ColorSettings);
        console.log(HomeData.THEMES[ColorSettings.SelectedTheme].bg)
        this.setState({
            bg:HomeData.THEMES[ColorSettings.SelectedTheme].bg
        })
        EventEmitter.on(CustomEvents.THEME_SELECTED, this.updateTheme);
        this.props.navigation.addListener('focus', this._onFocus);
        this.props.navigation.addListener('blur', this._onBlur);
    }
    _onFocus = () => {
        console.log("Home _onFocus");
        EventEmitter.emit(CustomEvents.PLAY_BG);
    }
    _onBlur = () => {
        console.log("Home _onBlur");
        EventEmitter.emit(CustomEvents.MEDIA_ACTIVE);
    }
    componentWillUnmount() {
        EventEmitter.off(CustomEvents.THEME_SELECTED, this.updateTheme);
    }

    updateTheme = themeIndex => {
        console.log("Main Content THEME_SELECTED")
        this.setState({
            bg:HomeData.THEMES[themeIndex].bg
        })
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
                shouldPlay={true}
                isLooping={true}
                orientation="portrait"
                useNativeControls={false}
                onLoadStart={() => {
                    console.log("bg video started!");
                }}
                onLoad={status => {
                    console.log("bg video loaded with status: ", status);
                }}
            />

            <MenuIcon navigateTo={"Customize"}/>

            <View style={styles.logoContainer}>
                <Logo />
            </View>


            <MainBG />

            <MainContent />

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
        paddingTop: 20,
        alignItems: "center",
    }
});
