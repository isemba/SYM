import {View, StyleSheet } from "react-native";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {navigate} from "../RootNavigation";
import Logo from "../Logo";
import MainContent from "../MainContent";


export default function HomeScreen() {
    const videoError = (err) => {
        console.log("Video Error", err);
    };

    const onBuffer = (buff) => {
        console.log("Buffer", buff);
    };

    return (
        <View style={{flex : 1}}>
            <Ionicons
                name={'ios-aperture'}
                size={12}
                color={'#000'}
                style={{ padding: 10, fontSize:20 }}
                onPress={()=>{
                    navigate('Customize');
                }}
            />

            <View style={styles.logoContainer}>
                <Logo />
            </View>

            <MainContent/>


        </View>
    );
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    logoContainer: {
        alignItems : "center",
    }
});
