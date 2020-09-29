import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import React from "react";
import {Color} from "../utils/Colors";

const windowWidth = Dimensions.get('window').width;
export default function Title(props) {
    const { title, active, onPress } = props;


    if( onPress == null ){
        return (
            <View style={styles.container}>
                <Text style={[ styles.text, { backgroundColor : active ? Color.ACTIVE_TITLE : Color.TITLE } ]}>{ title }</Text>
            </View>
        )
    }else{
        return (
            <TouchableOpacity style={styles.container} onPress={onPress} >
                <Text style={[ styles.text, { backgroundColor : active ? Color.ACTIVE_TITLE : Color.TITLE } ]}>{ title }</Text>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        borderRadius: 20,
        flexDirection: 'row',
        marginVertical: 10,
        marginRight: 5,
        height: 35
    },
    text:{
        color: Color.LIGHT_TEXT_COLOR,
        fontWeight: "bold",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        overflow: "hidden"
    }
});
