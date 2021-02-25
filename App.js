import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Navigation from "./components/Navigation";
import {SafeAreaView, View, StatusBar} from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import * as axios from "axios";
import {CONTENT_URL, LOGIN_URL, BASE_API_URL} from "./environement";
import {HomeData, MusicList} from "./utils/Data";
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

        EventEmitter.on(CustomEvents.THEME_SELECTED, this.updateTheme)
    }

    updateTheme = themeIndex =>{
        this.setState({themeIndex}, ()=>{
            navigate("Main");
        })
    }

    componentWillUnmount() {
        EventEmitter.off(CustomEvents.THEME_SELECTED, this.updateTheme)
    }

    prepareResources = async () => {
        await performAPICalls();
        await downloadAssets();

        this.setState({ appIsReady: true }, async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
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
        const { token, initial: { popular, today, blog, discover, music, moods, starter, themes } } = loginData.data;

        console.log("/****/");
        console.log(loginData.data);
        console.log("/****/");

        HomeData.TOKEN = token;
        /*console.log("token>>>")
        console.log(HomeData.TOKEN)*/
        HomeData.POPULAR = JSON.parse(popular);
        HomeData.BLOG = JSON.parse(blog);
        HomeData.DISCOVER = JSON.parse(discover);
        HomeData.MUSIC = JSON.parse(music);
        HomeData.MOODS = JSON.parse(moods);
        HomeData.STARTER = JSON.parse(starter);
        HomeData.TODAY = today;
        HomeData.THEMES = JSON.parse(themes).reverse();

        HomeData.STATS = loginData.data.stats;

        /*console.log("/----/");
        console.log(HomeData.STATS);
        console.log("/----/");*/

        fixUrls([...HomeData.BLOG, ...HomeData.DISCOVER, ...HomeData.MUSIC, ...HomeData.POPULAR, ...HomeData.MOODS, ...HomeData.THEMES]);

        fixUrls([HomeData.STARTER])
        HomeData.STARTER.showVideo=true;

        console.log("HomeData.POPULAR", HomeData.POPULAR);
        console.log("HomeData.BLOG", HomeData.BLOG);
        console.log("HomeData.DISCOVER", HomeData.DISCOVER);
        console.log("HomeData.TODAY", HomeData.TODAY);
        console.log("HomeData.MUSIC", HomeData.MUSIC);
        console.log("HomeData.MOODS", HomeData.MOODS);
        console.log("HomeData.STARTER", HomeData.STARTER);
        console.log("HomeData.THEMES", HomeData.THEMES);
        try {
            /*console.log("send");
            console.log(HomeData.TOKEN)*/
            await axios.post(BASE_API_URL+'content', { media:"music" },{
                headers: {
                  'authorization': 'Bearer '+HomeData.TOKEN
                }}).then((response)=>{
                    //console.log(response);
                    var l = response.data;
                    var a = [];
                    for (var i=0; i < 5;i++){
                        //console.log("list >>>>>>")
                        //console.log(l[i].title)
                        fixUrls(l[i].meditations)
                        a.push(l[i])
                    }
                    HomeData.MUSICLIST = a;
                });
            await axios.post(BASE_API_URL+'content', { media:"video" },{
                headers: {
                    'authorization': 'Bearer '+HomeData.TOKEN
                }}).then((response)=>{
                    //console.log("videolist >>>")
                    //console.log(response);
                    var v = response.data;
                    var b = [];
                    for (var i=0; i < v.length;i++){
                        fixUrls(v[i].meditations)
                        b.push(v[i])
                    }
                    HomeData.VIDEOLIST = b;
                });
            await axios.post(BASE_API_URL+'content', { media:"blog" },{
                headers: {
                    'authorization': 'Bearer '+HomeData.TOKEN
                }}).then((response)=>{
                    //console.log("videolist >>>")
                    //console.log(response.data);
                    /*var v = response.data;
                    var b = [];
                    for (var i=0; i < v.length;i++){
                        fixUrls(v[i].meditations)
                        b.push(v[i])
                    }
                    HomeData.VIDEOLIST = b;*/
                    HomeData.BLOGLIST = response.data[0].meditations;
                    fixUrls([...HomeData.BLOGLIST]);
                    //console.log(HomeData.BLOGLIST);
                });
        }catch (e){
            console.error(e);
        }
    }catch (e){
        console.error(e);
    }
}
async function downloadAssets() {}


