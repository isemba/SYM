import React, { Component } from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Color} from "../utils/Colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function MoodCard({mood}){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{mood}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        backgroundColor: Color.MAIN_DARK,
        borderRadius: 10,
        width: windowWidth * 9 / 40,
        height: windowWidth * 9 / 40,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: Color.LIGHT_TEXT_COLOR,
        fontWeight: 'bold',
        fontSize: 12
    }
});
