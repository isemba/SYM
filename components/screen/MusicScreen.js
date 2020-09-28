import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Color } from "../../utils/Colors";
import Languages, { getLanguageText } from '../../utils/Language';
import Card from '../Card';
import Title from "../Title";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MusicScreen() {
    return (
        <View>
            <ScrollView
                style={styles.container}
                horizontal={true}
            >

                <Title style={styles.titleContainer} title={getLanguageText(Languages.SELF_REALISATON)} />
                <Title style={styles.titleContainer} title={getLanguageText(Languages.SELF_REALISATON)} />
                <Title style={styles.titleContainer} title={getLanguageText(Languages.SELF_REALISATON)} />
                <Title style={styles.titleContainer} title={getLanguageText(Languages.SELF_REALISATON)} />
                <Title style={styles.titleContainer} title={getLanguageText(Languages.SELF_REALISATON)} />
                <Title style={styles.titleContainer} title={getLanguageText(Languages.SELF_REALISATON)} />

            </ScrollView>

            <View style={styles.discoverContainer}>
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
                <View style={styles.cardContainer  }>
                     <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />  
                </View>
                
                
                
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: windowWidth / 50
    },
    titleContainer: {
        flexDirection: "row",
    },
    discoverContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: windowWidth
    },
    cardContainer: {
        margin: windowWidth * 3 / 100
    }
});


export default MusicScreen;
