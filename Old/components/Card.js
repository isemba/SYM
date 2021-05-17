import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { BlurView } from 'expo-blur';
import React from "react";
import {ChangeTheme, Color} from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { MediaType } from "../utils/EnumTypes";
import {navigate, setWelcome} from "./RootNavigation";
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../models/CustomEvents";
import { HomeData } from "../utils/Data";
import * as Analytics from "expo-firebase-analytics";

const windowWidth = Dimensions.get('window').width;
const radios = 15;

export default function Card(props) {


    const { lock, title, desc, source, uri, text, themeIndex, id, target, url, callback } = props;
    const media = props.media ? props.media : MediaType.VIDEO;
    const size = props.size ? props.size : 47;
    const isSquare = props.isSquare ? props.isSquare : false;

    const onCardPress= ()=>{
        switch (media) {
            case MediaType.BLOG:
            case MediaType.HOME_BLOG:
            case MediaType.VIDEO:
                if(HomeData.STARTER.showVideo){
                    HomeData.STARTER.showVideo = false;
                    setWelcome();
                    navigate('WelcomeVideo');
                } else {
                    Analytics.logEvent("VideoOpen", {id});
                    navigate('Video', {uri, id});
                }

                break;

            case MediaType.MUSIC:
                Analytics.logEvent("MusicOpen", {id: target.cid});
                navigate('Music', {target});
                break;
            case MediaType.THEME:
                Analytics.logEvent("ThemeSelect", {id});
                callback(themeIndex)
                break;

            default:
                break;
        }
    }
    //console.log(props)
    return (
        <TouchableOpacity
            onPress={onCardPress}
        >
            <ImageBackground
                style={[styles.container, props.style, {width: windowWidth * size / 100, height: isSquare ? windowWidth * size / 100 : 300}]}
                source={source}
                imageStyle={{ borderRadius: radios, resizeMode: "cover" }}
            >

                {lock ? <Lock /> : null}

               {title ? renderTitle(title, desc) : null}
            </ImageBackground>
        </TouchableOpacity>


    )
};
function renderTitle(title, desc){
    return(
        <View style={[styles.bottom]} intensity={40}>
            <Text style={styles.titleStyle}>
                {title}
            </Text>
            <Text style={styles.descStyle}>
                {desc}
            </Text>
        </View>
    )

}

function Lock() {
    return (
        <View style={styles.lock}>
            <Ionicons
                name={'ios-lock'}
                size={12}
                color={Color.LIGHT_TEXT_COLOR}
                style={{ padding: 10, fontSize: 20 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.MENU,
        borderRadius: radios,
        justifyContent: "flex-end",
        marginBottom: 10
    },
    lock: {
        position: "absolute",
        top: 0,
        left: 0
    },
    bottom: {
        borderBottomRightRadius: radios,
        borderBottomLeftRadius: radios,
        padding: 14,
        overflow: "hidden",
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    titleStyle: {
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 2
    },
    descStyle: {
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 11
    }

});
