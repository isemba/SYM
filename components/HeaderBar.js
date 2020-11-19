import { Text, View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import React from "react";
import { Color } from "../utils/Colors";

const windowWidth = Dimensions.get('window').width;
export default function HeaderBar(props) {
    const { title} = props;
    return (

        <ImageBackground
            style={styles.container}
            //source={require('../assets/images/sun_moon2.png')}
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
        marginBottom: 5,
        backgroundColor: '#280d52'

    },
    text: {
        color: Color.LIGHT_TEXT_COLOR,
        fontWeight: "bold",
        fontSize: 25,
        paddingVertical: 5,
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: {width:3, height:3},
        textShadowRadius: 4,
        elevation: 5
        

    },
    image: {

    }
});
