import {Text, View, StyleSheet, Image, Dimensions} from "react-native";
import React from "react";
export default function Logo() {
    return (
        <Image
            style={styles.tinyLogo}
            source={require('../assets/images/logo5.png')}
        />
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const logoRatio = 0.4;
const logoSize = {
    originalWidth: 960,
    originalHeight: 660,
    scale: 1
}
const setLogoScale = () => {
    const width = windowWidth * logoRatio;
    const heigth = (width / logoSize.originalWidth) * logoSize.originalHeight
    return {width, heigth};
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: setLogoScale().width,
        height:setLogoScale().heigth

    }
});
