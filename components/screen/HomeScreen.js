import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "../RootNavigation";
import Logo from "../Logo";
import MainContent from "../MainContent";
import MainBG from "./MainBG";
import { Video } from "expo-av";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen() {


    return (
        <View style={{ flex: 1 }}>

            <Video  source={{ uri: 'https://sahajayoga-assets.s3-eu-west-1.amazonaws.com/backgroundvideo-home-2.mp4' }}  // Can be a URL or a local file.
                rate={1.0}                                     // Store reference
                volume={1.0}
                isMuted={true}
                resizeMode={Video.RESIZE_MODE_COVER}
                style={styles.backgroundVideo}
                shouldPlay={true}
                isLooping={true}
                orientation="portrait"
                useNativeControls={false}
                onLoadStart={() => {
                    console.log("video started!");
                }}
                onLoad={status => {
                    console.log("video loaded with status: ", status);
                }}
            />

            <Ionicons
                name={'ios-aperture'}
                size={12}
                color={'yellow'}
                style={{ padding: 20, fontSize: 30 }}
                onPress={() => {
                    navigate('Customize');
                }}
            />


            <View style={styles.logoContainer}>
                <Logo />
            </View>


            <MainBG />

            <MainContent />

        </View>
    );
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: windowWidth,
        height: windowHeight
    },
    logoContainer: {
        alignItems: "center",
    }
});
