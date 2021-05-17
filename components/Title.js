import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import React, {useState, useEffect} from "react";
import {Color} from "../utils/Colors";
import AppLoading from 'expo-app-loading';
import { useFonts, Lato_400Regular, Lato_300Light } from "@expo-google-fonts/lato";
import { LinearGradient } from 'expo-linear-gradient';
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../models/CustomEvents";

const windowWidth = Dimensions.get('window').width;
export default function Title(props) {
    const { title, active, onPress } = props;
    let [fontLoaded] = useFonts({ Lato_400Regular, Lato_300Light});

    const [bgColor, changeBgColor] = useState(Color.SLIDER_GRADIENT);
    const updateTheme = themeIndex => {
        console.log("Title THEME_SELECTED");        
        changeBgColor(Color.SLIDER_GRADIENT);
        
    }
    useEffect(() => {
        EventEmitter.on(CustomEvents.THEME_SELECTED, updateTheme);
    
        return () => {
            EventEmitter.off(CustomEvents.THEME_SELECTED, updateTheme);
        };
      }, [updateTheme]);
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
                    <LinearGradient
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    colors={active ? Color.SLIDER_ACTIVE_GRADIENT : bgColor}
                    style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom:0,
                    right:0,
                    borderRadius:20
                }} />
                    {/* <Text style={[ styles.text, { fontFamily: active ? "Lato_400Regular" : "Lato_300Light"  } ]}>{ title }</Text> */}
                    <Text style={[ styles.text, { fontFamily: "Lato_400Regular" } ]}>{ title }</Text>
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
