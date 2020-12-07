import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import React, { Component } from 'react';
import Card from "../Card";
import { Color } from "../../utils/Colors"
import Languages, { getLanguageText } from "../../utils/Language";
import HeaderBar from "../HeaderBar";
import {LinearGradient} from "expo-linear-gradient";
import {HomeData} from "../../utils/Data";
import {MediaType} from "../../utils/EnumTypes";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class BlogScreen extends Component {

    BlogViews = [];

    constructor(props) {
        super(props);

        HomeData.BLOG.forEach((item, index) => {
            const size = index === 0 ? 96 : 47;
            this.BlogViews.push(
                <Card
                    size={size}
                    lock={false}
                    color={Color.MENU}
                    title={item.title}
                    desc={getLanguageText(Languages.DISCOVER)}
                    source={{ uri: item.url }}
                    media={MediaType.BLOG}
                    uri={item.uri}
                    key={"blogCard_"+index}
                    text={item.text}
                />
            )
        });
    }

    render() {
        return (
            <LinearGradient colors={Color.MAIN_BG_GRADIENT}>
                <HeaderBar title={getLanguageText(Languages.BLOG)} />
                <ScrollView style={styles.container}>
                    <View style={styles.blogCards}>
                        { this.BlogViews }
                    </View>
                    <View style={{ height: 140 }} />
                </ScrollView>

            </LinearGradient>

        );
    }
}
const styles = StyleSheet.create({

    container: {
        width: windowWidth,
        height: windowHeight,

    },
    blogCards: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: 7,
        flexWrap: "wrap",
        paddingTop: 5
    },
    backGround:{
        backgroundColor: '#280d52'
    }
});

export default BlogScreen;
