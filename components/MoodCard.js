import React, { Component } from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {Color} from "../utils/Colors";
import {navigate} from "./RootNavigation";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function MoodCard({mood, uri}){
    return (
        <TouchableWithoutFeedback
            onPress={()=>{
                navigate("Video", { uri });
            }}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{mood}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Color.MAIN_DARK,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth * 9 / 40,
        height: windowWidth * 9 / 40,
        marginBottom: 10,
        paddingHorizontal: 5
    },
    text: {
        color: Color.LIGHT_TEXT_COLOR,
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center'

    }
});
