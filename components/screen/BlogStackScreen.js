import {Text, View, StyleSheet} from "react-native";
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import BlogScreen from "./BlogScreen";
import Languages, {getLanguageText} from "../../utils/Language";
import BlogContent from "../BlogContent";
import {Color} from "../../utils/Colors";
import {Lato_400Regular, useFonts} from "@expo-google-fonts/lato";


const BlogStack = createStackNavigator();

export default function BlogStackScreen(){
    let [fontLoaded] = useFonts({ Lato_400Regular});

    return (
        <BlogStack.Navigator>
            <BlogStack.Screen
                name="BlogScreen"
                component={BlogScreen}
                options={{ title: getLanguageText(Languages.BLOG), headerTransparent: true, headerShown: false }}
            />
            <BlogStack.Screen
                name="BlogContent"
                component={BlogContent}
                options={{
                    title: getLanguageText(Languages.BLOG),
                    headerTransparent: true,
                    headerTitle:false,
                    headerBackTitleStyle: {
                        color: Color.LIGHT_TEXT_COLOR,
                        fontFamily: "Lato_400Regular"
                    }
                }}
            />
        </BlogStack.Navigator>
    )
}
