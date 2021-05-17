import {Text, View, StyleSheet, Image, Dimensions} from "react-native";
import React from "react";
export default function LogoHorizontal() {
    return (
        <Image
            style={styles.tinyLogo}
            source={require('../assets/images/logo-horizontal.png')}
        />
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const logoRatio = 0.8;
const logoSize = {
    originalWidth: 234,
    originalHeight: 25,
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
        height:setLogoScale().heigth,
        marginTop:10,
        marginBottom:10
    }
});
