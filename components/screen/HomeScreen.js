import {View, StyleSheet, ScrollView} from "react-native";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {navigate} from "../RootNavigation";
import Logo from "../Logo";
import MainContent from "../MainContent";
import MainBG from "./MainBG";



export default function HomeScreen() {


    return (
        <View style={{flex : 1}}>
            <Ionicons
                name={'ios-aperture'}
                size={12}
                color={'#000'}
                style={{ padding: 10, fontSize:20 }}
                onPress={()=>{
                    navigate('Customize');
                }}
            />

            <View style={styles.logoContainer}>
                <Logo />
            </View>

            <MainBG />

            <MainContent/>

        </View>
    );
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    logoContainer: {
        alignItems : "center",
    }
});
