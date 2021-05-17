import { StyleSheet, View, Text, ScrollView, Dimensions,ImageBackground, SafeAreaView } from "react-native";
import React, { Component } from 'react';
import Card from "../Card";
import { Color } from "../../utils/Colors"
import Languages, { getLanguageText } from "../../utils/Language";
import HeaderBar from "../HeaderBar";
import {LinearGradient} from "expo-linear-gradient";
import {HomeData} from "../../utils/Data";
import {MediaType} from "../../utils/EnumTypes";
import {navigate} from "../RootNavigation";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class BlogScreen extends Component {

    BlogViews = [];

    constructor(props) {
        super(props);

        //console.log(HomeData.BLOGLIST);

        HomeData.BLOGLIST.forEach((item, index) => {
            //console.log(item);
            const size = index === 0 ? 96 : 47;
            this.BlogViews.push(                
                <Card
                    size={size}
                    lock={false}
                    color={Color.MENU}
                    title={item.title}
                    desc={getLanguageText(Languages.BLOG)}
                    source={{uri:item.image}}
                    media={MediaType.BLOG}
                    uri={item.url}
                    key={"blogCard_"+index}
                    text={item.text}
                />
            )
        });

        console.log("blog screen");
        //console.log(HomeData.BLOG_CONTENT)
        if(HomeData.BLOG_CONTENT.cid != null && HomeData.BLOG_CONTENT.cid !=undefined){
            let tmObj = {};
            tmObj.uri={};
            tmObj.uri.uri=HomeData.BLOG_CONTENT.url;
            tmObj.title = HomeData.BLOG_CONTENT.title;
            tmObj.source={};
            tmObj.source.uri = HomeData.BLOG_CONTENT.image;
            tmObj.text = HomeData.BLOG_CONTENT.text;
            this.props.navigation.navigate('BlogContent', tmObj);
        } 
    }
    
    render() {
        return (             
                <SafeAreaView style={{display:"flex", flex:1}}>
            <ImageBackground source={Color.BG_IMAGE} style={styles.image}>
                <ScrollView contentContainerStyle={styles.container}>
                    
                        <View style={styles.blogCards}>
                            { this.BlogViews }
                        </View>
                        <View style={{ height: 140 }} />
                    
                </ScrollView>
                </ImageBackground>
                </SafeAreaView>

        );
    }
}
const styles = StyleSheet.create({

    container: {
        width: windowWidth,
        flexGrow : 1        
    },
    blogCards: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: 7,
        flexWrap: "wrap",
        paddingTop:90,
        paddingBottom:35
    },
    backGround:{
        backgroundColor: '#280d52'
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "cover"   
    }
});

export default BlogScreen;
