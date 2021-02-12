import {Text, View, StyleSheet, Image} from "react-native";
import React, {Component} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import BlogScreen from "./BlogScreen";
import Languages, {getLanguageText} from "../../utils/Language";
import BlogContent from "../BlogContent";
import {Color} from "../../utils/Colors";
import {Lato_400Regular, useFonts} from "@expo-google-fonts/lato";
import { LinearGradient } from 'expo-linear-gradient';

const BlogStack = createStackNavigator();

export default class BlogStackScreen extends Component{
    
    constructor(props) {
        super(props);

        console.log(props)
    }
    componentDidMount(){
        console.log("blogstack mount");
        console.log(this.props)
    }
    componentDidUpdate(){
        console.log("blogstack update");
        console.log(this.props)
    }
    render(){
    return (
        <BlogStack.Navigator>
            <BlogStack.Screen
                name="BlogScreen"
                component={BlogScreen}
                options={{ 
                    title: getLanguageText(Languages.BLOG), 
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitle:getLanguageText(Languages.BLOG),
                    headerTitleStyle : style.headerTitleMain,                    
                    headerBackground: ()=> (
                        <LinearGradient
                          colors={[Color.HEADER_GRADIENT[0], Color.HEADER_GRADIENT[1]]}
                          style={{ flex: 1 }}
                          start={{x: 0, y: 0}}
                          end={{x: 0, y: 1}}
                        />
                      ),
                    }}
            />
            <BlogStack.Screen
                name="BlogContent"
                component={BlogContent}
                options={{ 
                    title: getLanguageText(Languages.BLOG), 
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitle:getLanguageText(Languages.BLOG),
                    headerTitleStyle : style.headerTitle,
                    headerBackImage: ()=>(<Image source={require('../../assets/images/back.png')} resizeMode="center" style={{ width: 32, height: 32 }} />),
                    headerBackground: ()=> (
                        <LinearGradient
                          colors={[Color.HEADER_GRADIENT[0], Color.HEADER_GRADIENT[1]]}
                          style={{ flex: 1 }}
                          start={{x: 0, y: 0}}
                          end={{x: 0, y: 1}}
                        />
                      ),
                    }}
            />
        </BlogStack.Navigator>
    )
                }
}
const style = StyleSheet.create({
    headerTitleMain:{
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 20,
        fontFamily: "Lato_400Regular",
        textAlign:"center",
        paddingRight:60,
        paddingLeft:60,
    },
    headerTitle:{
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 20,
        fontFamily: "Lato_400Regular",
        textAlign:"center",
        paddingRight:60
    }
});
