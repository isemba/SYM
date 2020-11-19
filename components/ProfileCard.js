import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Color } from "../utils/Colors";
import { navigate } from "./RootNavigation";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ProfileCard() {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>Beğendiklerim</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Alarm</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Notlar</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Sıkça Sorulan Sorular</Text>
            </View>          
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.MENU,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth * 9 / 10,
        height: windowWidth * 9 / 40,
        marginBottom: 10,
        paddingHorizontal: 5
    },
    text: {
        color: Color.LIGHT_TEXT_COLOR,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'

    },
    backGround:{
        backgroundColor: '#280d52'
    }
});
