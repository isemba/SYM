import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Navigation from "./components/Navigation";
import {SafeAreaView, View, StatusBar} from "react-native";
import * as SplashScreen from 'expo-splash-screen';

export default class App extends Component {
    state = {
        appIsReady: false,
    };

    async componentDidMount() {
        // Prevent native splash screen from autohiding
        try {
            await SplashScreen.preventAutoHideAsync();
        } catch (e) {
            console.warn(e);
        }
        this.prepareResources();
    }

    prepareResources = async () => {
        await performAPICalls();
        await downloadAssets();

        this.setState({ appIsReady: true }, async () => {
            await SplashScreen.hideAsync();
        });
    };

    render() {
        if (!this.state.appIsReady) {
            return (
                <View>
                    <StatusBar hidden={true}/>
                </View>
            );
        }

        return (
            <SafeAreaView style={{ flex: 1}}>
                <StatusBar hidden={true}/>
                <Navigation />
            </SafeAreaView>
        );
    }
}

async function performAPICalls() {}
async function downloadAssets() {}
