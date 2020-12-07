import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { BlurView } from 'expo-blur';
import React from "react";
import {ChangeTheme, Color} from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { MediaType } from "../utils/EnumTypes";
import {navigate} from "./RootNavigation";
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../models/CustomEvents";

const windowWidth = Dimensions.get('window').width;
const radios = 15;

export default function Card(props) {

    const { lock, title, desc, source, uri, text, themeIndex, id } = props;
    const media = props.media ? props.media : MediaType.VIDEO;
    const size = props.size ? props.size : 47;
    const isSquare = props.isSquare ? props.isSquare : false;

    return (
        <TouchableOpacity
            onPress={() => {

                switch (media) {
                    case MediaType.BLOG:
                        navigate('BlogContent', {uri, text, title});
                        break;

                    case MediaType.VIDEO:
                        console.log("card pressed!" , media);
                        break;

                    case MediaType.MUSIC:
                        navigate('Music', {id});
                        break;
                    case MediaType.THEME:
                        ChangeTheme(themeIndex);
                        EventEmitter.emit(CustomEvents.THEME_SELECTED, themeIndex);
                        break;

                    default:
                        break;
                }
            }}
        >
            <ImageBackground
                style={[styles.container, {width: windowWidth * size / 100, height: isSquare ? windowWidth * size / 100 : 300}]}
                source={source}
                imageStyle={{ borderRadius: radios }}
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
