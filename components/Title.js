import {Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback} from "react-native";
import React from "react";
import {Color} from "../utils/Colors";

const windowWidth = Dimensions.get('window').width;
export default function Title(props) {
    const { title, active, onPress } = props;
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={onPress} >
            <Text style={[ styles.text, { backgroundColor : active ? Color.ACTIVE_TITLE : Color.TITLE } ]}>{ title }</Text>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container:{
        borderRadius: 15,
        marginVertical: 5,
        flexDirection: 'row',
        height: 30
    },
    text:{
        color: Color.LIGHT_TEXT_COLOR,
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 15,
        overflow: "hidden"
    }
});
