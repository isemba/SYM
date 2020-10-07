import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { Color } from "../utils/Colors";

const windowWidth = Dimensions.get('window').width;
export default function HeaderBar(props) {
    const { title} = props;
    return (

        <ImageBackground
            style={styles.container}
            source={require('../assets/images/sun&moon.png')}
        >
            <Text style={styles.text}>{title}</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        alignItems: 'center',
        justifyContent: "center",

    },
    text: {
        color: Color.MAIN,
        fontWeight: "bold",
        fontSize: 25,
        paddingVertical: 5,

    },
    image: {

    }
});
