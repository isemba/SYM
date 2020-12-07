import React from "react";
import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import {navigate} from "../RootNavigation";

export default function MenuIcon({navigateTo}){
    return (
        <TouchableOpacity
            style={{
                position: "absolute",
                top: 15,
                left: 15
            }}
            onPress={() => {
                console.log("navigateTo: " + navigateTo)
                navigate(navigateTo);
            }}
        >
            <Image
                style={styles.menuIcon}
                source={require("../../assets/images/main-logo.png")}

            />
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    menuIcon: {
        width: 40,
        height: 40,
    }
});
