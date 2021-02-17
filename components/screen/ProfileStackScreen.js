import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingScreen";
import FaqScreen from "./FaqScreen";
import {ContactScreen} from "./ContactScreen";
import {Ionicons} from "@expo/vector-icons";
import {navigate } from "../RootNavigation";
import {Color} from "../../utils/Colors";
import Languages, {getLanguageText} from "../../utils/Language";
import {Lato_400Regular, useFonts} from "@expo-google-fonts/lato";
import { LinearGradient } from 'expo-linear-gradient';

const ProfileStack = createStackNavigator();


export default function ProfileStackScreen() {
    let [fontLoaded] = useFonts({ Lato_400Regular});



    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: getLanguageText(Languages.PROFILE),
                    
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitle:getLanguageText(Languages.PROFILE),
                    headerTitleStyle : style.headerMainTitle,
                    
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
            <ProfileStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ 
                    title: getLanguageText(Languages.SETTINGS), 
                    headerBackTitleVisible: false,
                    headerTitle:getLanguageText(Languages.SETTINGS),
                    headerTitleStyle : {
                        color: Color.LIGHT_TEXT_COLOR,
                        fontSize: 20,
                        fontFamily: "Lato_400Regular"
                    },
                    headerBackImage: ()=>(<Image source={require('../../assets/images/back.png')} resizeMode="center" style={{ width: 32, height: 32 }} />),
                    headerBackground: ()=> (
                        <LinearGradient
                          colors={[Color.HEADER_GRADIENT[0], Color.HEADER_GRADIENT[1]]}
                          style={{ flex: 1 }}
                          start={{x: 0, y: 0}}
                          end={{x: 0, y: 1}}
                        />
                      ) }}
            />
            <ProfileStack.Screen
                name="Faq"
                component={FaqScreen}
                options={{ 
                    title: getLanguageText(Languages.FAQ), 
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitle:getLanguageText(Languages.FAQ),
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
            <ProfileStack.Screen
                name="Contact"
                component={ContactScreen}
                options={{ 
                    title: getLanguageText(Languages.CONTACT), 
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitle:getLanguageText(Languages.CONTACT),
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
        </ProfileStack.Navigator>
    );
}


function SettingsButton() {
    return (
        <View>
            <Ionicons
                name={'ios-settings'}
                size={12}
                color={Color.MAIN_DARK}
                style={style.settings}
                onPress={()=>{
                    navigate('Settings');
                }}
            />
        </View>
    )
}

const style = StyleSheet.create({
    settings: {
        color: "#fff",
        fontSize: 26,
        padding: 10
    },
    headerTitle:{
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 20,
        fontFamily: "Lato_400Regular",
        textAlign:"center",
        paddingRight:60
    },
    headerMainTitle:{
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 20,
        fontFamily: "Lato_400Regular",
        textAlign:"center",
        paddingLeft:30
    }
});
