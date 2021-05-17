import {Text, View, Dimensions, StyleSheet, ImageBackground} from "react-native";
import React from "react";
import Card from "../Card";
import ProfileCard from "../ProfileCard";
import {Color} from "../../utils/Colors";
import {LinearGradient} from "expo-linear-gradient";
import {useFonts, Lato_400Regular} from "@expo-google-fonts/lato";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProfileScreen() {
    return (
        <ImageBackground source={Color.BG_IMAGE} style={styles.image}>
            <ProfileCard />
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#280d52'

    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "cover"
    }
});
export default ProfileScreen;
