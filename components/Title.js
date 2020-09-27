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
        borderRadius: 15,
        marginVertical: 5,
        flexDirection: 'row'
    },
    text:{
        color: Color.LIGHT_TEXT_COLOR,
        fontWeight: "bold",
        backgroundColor: Color.TITLE,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 15,
        overflow: "hidden"
    }
});
