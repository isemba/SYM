import {Text, View, Dimensions, StyleSheet} from "react-native";
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
        <LinearGradient style={styles.container} colors={Color.MAIN_BG_GRADIENT}>
            <ProfileCard />
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#280d52'

    }
});
export default ProfileScreen;
