import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Navigation from "./components/Navigation";
import {SafeAreaView, View, StatusBar} from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import * as axios from "axios";
import {CONTENT_URL, LOGIN_URL} from "./environement";
import {HomeData} from "./utils/Data";
import Constants from 'expo-constants';
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "./models/CustomEvents";
import {navigate} from "./components/RootNavigation";
import {fixUrls} from "./utils/Utils";

export default class App extends Component {
    state = {
        appIsReady: false,
        themeIndex: 0
    };


    constructor(props) {
        super(props);

        console.disableYellowBox = true;
    }

    async componentDidMount() {
        // Prevent native splash screen from autohiding
        try {
            await SplashScreen.preventAutoHideAsync();
        } catch (e) {
            //console.warn(e);
        }
        await this.prepareResources();

        EventEmitter.on(CustomEvents.THEME_SELECTED, themeIndex =>{
            this.setState({themeIndex}, ()=>{
                navigate("Main");
            })
        })
    }

    prepareResources = async () => {
        await performAPICalls();
        await downloadAssets();

        this.setState({ appIsReady: true }, async () => {
            try {
                await SplashScreen.hideAsync();
            }catch (e){

            }
        });
    };

    render() {
        console.log("this.state.themeIndex : " + this.state.themeIndex);

        if (!this.state.appIsReady) {
            return (
                <View>
                    <StatusBar hidden={true}/>
                </View>
            );
        }

        return (
            <View style={{ flex: 1}}>
                <StatusBar hidden={true}/>
                <Navigation />
            </View>
        );
    }
}

async function performAPICalls() {
    try {
        const loginData = await axios.post(LOGIN_URL, { deviceId: Constants.deviceId, name: "Samet" });
        const { token, initial: { popular, today, blog, discover, music } } = loginData.data;
        HomeData.POPULAR = JSON.parse(popular);
        HomeData.BLOG = JSON.parse(blog);
        HomeData.DISCOVER = JSON.parse(discover);
        HomeData.MUSIC = JSON.parse(music);
        HomeData.TODAY = today;

        fixUrls([...HomeData.BLOG, ...HomeData.DISCOVER, ...HomeData.MUSIC, ...HomeData.POPULAR]);



        console.log("HomeData.POPULAR", HomeData.POPULAR);
        console.log("HomeData.BLOG", HomeData.BLOG);
        console.log("HomeData.DISCOVER", HomeData.DISCOVER);
        console.log("HomeData.TODAY", HomeData.TODAY);
        console.log("HomeData.MUSIC", HomeData.MUSIC);
    }catch (e){
        console.error(e);
    }
}
async function downloadAssets() {}


