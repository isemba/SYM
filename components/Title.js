import {Text, View, StyleSheet, Dimensions} from "react-native";
import React from "react";
import {Color} from "../utils/Colors";

const windowWidth = Dimensions.get('window').width;
export default function Title(props) {
    const { title } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{ title }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Color.MENU,
        opacity: 0.8,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: windowWidth / 2,
        marginHorizontal: 10,
        marginVertical: 5

    },
    text:{
        color: Color.LIGHT_TEXT_COLOR,
        fontWeight: "bold"
    }
});
