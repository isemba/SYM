import { View, StyleSheet, Image, Dimensions } from "react-native";
import React, {Component} from "react";
import Logo from "../Logo";
import MainContent from "../MainContent";
import MainBG from "./MainBG";
import { Video } from "expo-av";
import MenuIcon from "./MenuIcon";
import {Color} from "../../utils/Colors";
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../../models/CustomEvents";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HomeScreen extends Component{
    state = {
        bg:Color.BG_VIDEO
    };

    componentDidMount() {
        EventEmitter.on(CustomEvents.THEME_SELECTED, this.updateTheme);
    }

    componentWillUnmount() {
        EventEmitter.off(CustomEvents.THEME_SELECTED, this.updateTheme);
    }

    updateTheme = themeIndex => {
        console.log("Main Content THEME_SELECTED")
        this.setState({
            bg:Color.BG_VIDEO
        })
    }

    render(){
    return (
        <View style={{ flex: 1 }}>

            <Video source={this.state.bg}  // Can be a URL or a local file.
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
