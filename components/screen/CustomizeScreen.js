import {Text, View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, ScrollView, Image} from "react-native";
import React from "react";
import Card from "../Card";
import {Color, ColorSettings} from "../../utils/Colors";
import MenuIcon from "./MenuIcon";
import {LinearGradient} from "expo-linear-gradient";
import HeaderBar from "../HeaderBar";
import {MediaType} from "../../utils/EnumTypes";

function CustomizeScreen() {
    const themes = [
        {source: require('../../assets/images/theme1.jpg')},
        {source: require('../../assets/images/theme2.jpg')},
        {source: require('../../assets/images/theme3.jpg')},
        {source: require('../../assets/images/theme4.jpg')}
    ]

    return (

        <LinearGradient style={styles.container} colors={Color.MAIN_BG_GRADIENT}>
            <HeaderBar title="Sahneler" size={60} />
            <MenuIcon navigateTo={"Main"}/>

            <ScrollView
                horizontal={true}
                contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                { themes.map((theme, index) => {
                    console.log("ColorSettings.SelectedTheme: " + ColorSettings.SelectedTheme);
                    const cardStyles = index === ColorSettings.SelectedTheme ? [styles.cardContainer, styles.active] : styles.cardContainer;
                    return (
                        <View style={cardStyles} key={"theme_"+index}>
                            <Card lock={false} color={Color.MENU} source={theme.source} themeIndex={index} media={MediaType.THEME} style={{marginBottom:0, height:"100%"}}/>
                        </View>
                    )
                }) }
            </ScrollView>

        </LinearGradient>
    );
}
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const radios = 15;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    cardContainer: {
        margin: 10,
    },
    active: {
        borderWidth: 2,
        borderRadius: 17,
        borderColor: Color.LIGHT
    }
});
export default CustomizeScreen;
