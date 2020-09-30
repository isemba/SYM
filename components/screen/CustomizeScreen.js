import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Card from "../Card";
import { Color } from "../../utils/Colors";
import Languages, { getLanguageText } from "../../utils/Language";

function CustomizeScreen() {
    return (

        <View style={styles.container}>
            <ScrollView horizontal={true} >
                <View style={styles.cardContainer}>
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                </View>
                <View style={styles.cardContainer}>
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                </View>
                <View style={styles.cardContainer}>
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                </View>
                <View style={styles.cardContainer}>
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                </View>
                <View style={styles.cardContainer}>
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                </View>

            </ScrollView>

        </View>
    );
}
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const radios = 15;
const styles = StyleSheet.create({
    cardContainer: {
        margin: 10
    },
    container: {
        position: "absolute",
        top: windowHeight/4,
        width: windowWidth

    }


});
export default CustomizeScreen;
