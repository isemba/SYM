import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import Card from "../Card";
import { Color } from "../../utils/Colors"
import Languages, { getLanguageText } from "../../utils/Language";
import HeaderBar from "../Card";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function BlogScreen() {

    return (
        <View>
            <HeaderBar title={getLanguageText(Languages.BLOG)} />
            <ScrollView style={styles.container}>
                <View style={styles.blogCards}>
                    <Card size={96} lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                    <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                </View>
            </ScrollView>
        </View>

    );
}
const styles = StyleSheet.create({

    container: {
        width: windowWidth,
        height: windowHeight

    },
    blogCards: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: 7,
        flexWrap: "wrap"

    }
});

export default BlogScreen;
