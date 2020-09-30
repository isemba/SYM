import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import Card from "../Card";
import { Color } from "../../utils/Colors"
import Languages, {getLanguageText} from "../../utils/Language";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function BlogScreen() {

    return (
        <ScrollView style={styles.container}>
            <View>
                <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
            </View>
            <View style={styles.blogCards}>
                <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />
                <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />

            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({

    container: {
        position: "absolute",
        top: windowHeight / 10,
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
