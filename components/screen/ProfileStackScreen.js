import {Text, View, StyleSheet} from "react-native";
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingScreen";
import {Ionicons} from "@expo/vector-icons";
import {navigate } from "../RootNavigation";
import {Color} from "../../utils/Colors";


const ProfileStack = createStackNavigator();


export default function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profil', headerRight: SettingsButton, headerTransparent: true, headerTitle:false }}
            />
            <ProfileStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Ayarlar' }}
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
        color: "#000",
        fontSize: 20,
        padding: 10
    }
});
