import { Text, View, StyleSheet, Dimensions, Platform } from "react-native";
import React from "react";
import { Color } from "../utils/Colors";
import {LinearGradient} from "expo-linear-gradient";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import AppLoading from 'expo-app-loading';
import {isIPhoneX} from "../utils/DeviceInfo";

const windowWidth = Dimensions.get('window').width;
export default function HeaderBar(props) {
    let [fontLoaded] = useFonts({ Lato_400Regular});

    const {title, size} = props;
    const containerStyle = {};
    if(size){
        containerStyle.height = size;
    }

     if(!fontLoaded){
         return <AppLoading />;
     }else{
        return (

            <LinearGradient
                style={[styles.container, containerStyle]}
                colors={Color.HEADER_GRADIENT}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
            >
                {isIPhoneX() ? <View style={{ height: 10 }} /> : null}
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: 55,
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 5,
        backgroundColor: '#280d52'

    },
    text: {
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 20,
        fontFamily: "Lato_400Regular",
        textAlign:"center",
        paddingRight:60,
        paddingLeft:60,



    },
    image: {

    }
});
