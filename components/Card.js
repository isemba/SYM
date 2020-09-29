import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { Color } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { MediaType } from "../utils/EnumTypes";

const windowWidth = Dimensions.get('window').width;
const radios = 15;

export default function Card(props) {

    const { lock, title, desc, source } = props;
    const media = props.media ? props.media : MediaType.VIDEO;

    console.log("CARD TITLE: ", title);

    return (
        <TouchableOpacity
            onPress={() => {
                
                switch (media) {
                    case MediaType.BLOG:

                        break;

                    case MediaType.VIDEO:
                        console.log("card pressed!" , media);
                        break;

                    case MediaType.MUSIC:

                        break;

                    default:
                        break;
                }
            }}
        >
            <ImageBackground
                style={styles.container}
                source={source}
                imageStyle={{ borderRadius: radios }}
            >

                {lock ? <Lock /> : null}

                <View style={styles.bottom}>
                    <Text style={styles.titleStyle}>
                        {title}
                    </Text>
                    <Text style={styles.descStyle}>
                        {desc}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>


    )
};

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
        width: windowWidth * 44 / 100,
        height: 200,
        justifyContent: "flex-end",
    },
    lock: {
        position: "absolute",
        top: 0,
        left: 0
    },
    bottom: {
        borderBottomRightRadius: radios,
        borderBottomLeftRadius: radios,
        padding: 10,
        backgroundColor: "rgba(0, 0, 0, 0.3)"
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
