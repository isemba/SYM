import {Text, View, StyleSheet} from "react-native";
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingScreen";
import {Ionicons} from "@expo/vector-icons";
import {navigate } from "../RootNavigation";
import {Color} from "../../utils/Colors";
import Languages, {getLanguageText} from "../../utils/Language";
import {Lato_400Regular, useFonts} from "@expo-google-fonts/lato";


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
                    headerRight: SettingsButton,
                    headerTransparent: true,
                    headerTitle:"Profil",
                    headerTitleStyle : {
                        color: Color.LIGHT,
                        fontSize: 20,
                        fontFamily: "Lato_400Regular"
                    }
                }}
            />
            <ProfileStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: getLanguageText(Languages.SETTINGS), headerBackTitleVisible: false }}
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
    }
});
