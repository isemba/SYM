import { Text, View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Color } from "../utils/Colors";

const windowWidth = Dimensions.get('window').width;
const radios = 15;

export default function HeaderBar(props) {

    const {title} = props;
    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.MENU,
        borderRadius: radios,
        height: 20,
        width: windowWidth,
        marginBottom: 10
    },
    titleStyle: {
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 2
    

});