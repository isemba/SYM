import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import React from "react";
import {Color} from "../utils/Colors";
import AppLoading from 'expo-app-loading';
import { useFonts, Lato_400Regular, Lato_300Light } from "@expo-google-fonts/lato";


const windowWidth = Dimensions.get('window').width;
export default function Title(props) {
    const { title, active, onPress } = props;
    let [fontLoaded] = useFonts({ Lato_400Regular, Lato_300Light});

    if(!fontLoaded){
        return <AppLoading />;
    }else{
        if( onPress == null ){
            return (
                <View style={styles.container}>
                    <Text style={[ styles.text ]}>{ title }</Text>
                </View>
            )
        }else{
            return (
                <TouchableOpacity style={styles.container} onPress={onPress} >
                    <Text style={[ styles.text, { backgroundColor : active ? Color.ACTIVE_TITLE : Color.TITLE, fontFamily: active ? "Lato_400Regular" : "Lato_300Light"  } ]}>{ title }</Text>
                </TouchableOpacity>
            )
        }
    }



}

const styles = StyleSheet.create({
    container:{
        borderRadius: 20,
        flexDirection: 'row',
        marginVertical: 10,
        marginRight: 5,
        height: 40
    },
    text:{
        color: Color.LIGHT_TEXT_COLOR,
        fontFamily: "Lato_400Regular",
        fontSize: 16,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        overflow: "hidden"
    }
});
