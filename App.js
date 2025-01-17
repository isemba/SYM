import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Navigation from "./components/Navigation";
import {View, StatusBar, LogBox, AppState, StyleSheet, Modal, TouchableOpacity, Text, Platform} from "react-native";
// import * as SplashScreen from 'expo-splash-screen';
import * as axios from "axios";
import {LOGIN_URL, BASE_API_URL} from "./environement";
import {HomeData} from "./utils/Data";
import Constants from 'expo-constants';
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "./models/CustomEvents";
import {navigate} from "./components/RootNavigation";
import {fixUrls} from "./utils/Utils";
import * as FileSystem from 'expo-file-system';
import {ChangeTheme, ColorSettings} from "./utils/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import audioPlayer from "./components/Player";
import * as Analytics from 'expo-firebase-analytics';


let that;
export default class App extends Component {
    _navRef;

    state = {
        appIsReady: false,
        themeIndex: 0,
        appState:AppState.currentState,
        noConnection:false
    };


    constructor(props) {
        super(props);
        //console.disableYellowBox = true;
        LogBox.ignoreAllLogs(true);
        that = this;
    }

    async componentDidMount() {
        EventEmitter.on(CustomEvents.NO_CONNECTION,this.onNoConnection);
        AppState.addEventListener('change', this._handleAppStateChange);
        try {
            const value = await AsyncStorage.getItem('@themeIndex');
            EventEmitter.on(CustomEvents.THEME_SELECTED, themeIndex =>{
                Analytics.logEvent("ThemeSelect", {id: themeIndex})
                this.setState({themeIndex}, ()=>{
                    navigate("Main");
                });
                this.switchBgMusic(themeIndex);

            });
            if(value !== null) {
                //console.log("has theme");
                //console.log(value)
                ChangeTheme(parseInt(value));
                EventEmitter.emit(CustomEvents.THEME_SELECTED, parseInt(value));
            }

            const bgvolume = await AsyncStorage.getItem('@bgvolume')
            if(bgvolume !== null) {
                //console.log("has bgvolume");
                //console.log(bgvolume);
                HomeData.BG_MUSIC.volume =  parseInt(bgvolume);
            }else{
                HomeData.BG_MUSIC.volume = 100;
            }
          } catch(e) {
            // error reading value
            //console.log("local storage error");
          }
          console.log("Platform.OS >>> "+Platform.OS);
        // Prevent native splash screen from autohiding
        if(Platform.OS == "android"){
            try {
                await SplashScreen.preventAutoHideAsync();
            } catch (e) {
                //console.warn(e);
            }
        }
        await this.prepareResources();
    }
    _handleAppStateChange = nextAppState => {
        //console.log("_handleAppStateChange");

        //console.log(nextAppState)
        /*if(this.state.appState != "background" && nextAppState == "background" && HomeData.BG_MUSIC.timer > 0){
            this.setBgTimer()
        }*/
        this.setState({
            appState:nextAppState
        });
    }
    setBgTimer(){
        //console.log("setBgTimer")
        //console.log(this.setBgTimer)
        let time = HomeData.BG_MUSIC.timer * 1000;
        //console.log(HomeData.BG_MUSIC.timer);
        //console.log(time)
    }
    prepareResources = async () => {
        await performAPICalls();
        //await downloadAssets();

        this.setState({ appIsReady: true }, async () => {
            if(Platform.OS == "android"){
                try {
                    await SplashScreen.hideAsync();
                }catch (e){
                    
                }
            }
        });
    };

    onNoConnection = () =>{
        //console.log("onnoConnection")
        this.setState({
            noConnection:true
        })
    }
    /*checkThemeMusic = () =>{
        if(this.state.musicReady){
            return(
                <Player url={this.state.bgMusic} />
            )
        }
    }*/
    async playBgMusic(){
        this.sound = audioPlayer.getInstance();
        //this.sound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
        await this.sound.createAudio();
        this.sound.loadAudioAsync(HomeData.THEMES[ColorSettings.SelectedTheme].audio);
        //console.log(this.sound)
        EventEmitter.on(CustomEvents.PLAY_BG, () =>{
            this.sound.shouldPlay = true;
            this.sound.toggleAudio(true);
        });
        EventEmitter.on(CustomEvents.MEDIA_ACTIVE, () =>{
            //console.log("this._navRef");
            //console.log(this._navRef)
            this.sound.shouldPlay = false;
            this.sound.toggleAudio(false);
        });
    }
    /*_onPlaybackStatusUpdate = playbackStatus => {
        console.log(playbackStatus)
    }*/
    async switchBgMusic(themeIndex){
        if(this.sound != null && this.sound != "undefined"){
             await this.sound.unloadAudioAsync();
            this.sound.loadAudioAsync(HomeData.THEMES[themeIndex].audio, true);
        }
    }
    render() {
        if (!this.state.appIsReady) {
            return (
                <View>
                    <StatusBar hidden={true}/>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor:'#000'}}>
                <StatusBar hidden={true}/>
                <Navigation />
                {/* {this.checkThemeMusic} */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.noConnection}
                    onRequestClose={() => {
                    //console.log('Modal has been closed.');
                    }}>
                    <TouchableOpacity
                        style={{ ...styles.container, backgroundColor: 'rgba(0,0,0,.3)' }}
                        onPress={() => {
                            this.setState({noConnection:false})
                        }}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>İnternet erişimi yok</Text>                   
                    </View>
                    </View>
                    </TouchableOpacity>
                </Modal>
            </View>
            
        );
    }
}

async function performAPICalls() {
    try {
        const loginData = await axios.post(LOGIN_URL, { deviceId: Constants.deviceId });
        const { token, initial: { popular, today, blog, discover, music, moods, starter, themes } } = loginData.data;

        //console.log("/****/");
        //console.log(loginData.data);
        //console.log("/****/");

        HomeData.TOKEN = token;
        HomeData.POPULAR = JSON.parse(popular);
        HomeData.BLOG = JSON.parse(blog);
        HomeData.DISCOVER = JSON.parse(discover);
        HomeData.MUSIC = JSON.parse(music);
        HomeData.MOODS = JSON.parse(moods);
        HomeData.STARTER = JSON.parse(starter);
        HomeData.TODAY = today;
        HomeData.THEMES = JSON.parse(themes).reverse();

        HomeData.STATS = loginData.data.stats;

        fixUrls([...HomeData.BLOG, ...HomeData.DISCOVER, ...HomeData.MUSIC, ...HomeData.POPULAR, ...HomeData.MOODS, ...HomeData.THEMES]);

        fixUrls([HomeData.STARTER])
        HomeData.STARTER.showVideo=true;

        //console.log(HomeData.POPULAR);
        for (let i=0;i < HomeData.THEMES.length;i++){
            let fa = HomeData.THEMES[i].video.split('/');
            let f = fa[fa.length-1];
            HomeData.THEMES[i].filename = f;
            let info = await FileSystem.getInfoAsync(FileSystem.documentDirectory+f);
            //console.log(info);
            if(info.exists){
                HomeData.THEMES[i].downloaded = true;
                HomeData.THEMES[i].bg = info.uri;
            }else{
                HomeData.THEMES[i].downloaded = false;
                if(i===0){
                    let downloadResumable = FileSystem.createDownloadResumable(
                        HomeData.THEMES[0].video,
                        FileSystem.documentDirectory + HomeData.THEMES[0].filename,
                        {}
                      );
                      try {
                        let { uri } = await downloadResumable.downloadAsync();
                        let info = await FileSystem.getInfoAsync(FileSystem.documentDirectory+HomeData.THEMES[0].filename);

                        HomeData.THEMES[0].downloaded = true;
                        HomeData.THEMES[0].bg = FileSystem.documentDirectory+HomeData.THEMES[0].filename;
                      } catch (e) {
                        console.error(e);
                      }
                }
            }
        }
        //console.log("HomeData.THEMES", HomeData.THEMES);
        that.setState({musicReady:true});
        that.playBgMusic();
        try {
            await axios.post(BASE_API_URL+'content', { media:"music" },{
                headers: {
                  'authorization': 'Bearer '+HomeData.TOKEN
                }}).then((response)=>{
                    
                    let l = response.data;
                    let a = [];

                    //console.log("music data")
                    //console.log(l);
                    for (let i=0; i < l.length;i++){
                        //console.log(l[i].meditations[0].group.title)
                        fixUrls(l[i].meditations)
                        a.push(l[i])
                    }
                    HomeData.MUSICLIST = a;
                });
            await axios.post(BASE_API_URL+'content', { media:"video" },{
                headers: {
                    'authorization': 'Bearer '+HomeData.TOKEN
                }}).then((response)=>{
                    let v = response.data;
                    let b = [];
                    for (let i=0; i < v.length;i++){
                        fixUrls(v[i].meditations)
                        b.push(v[i])
                    }
                    HomeData.VIDEOLIST = b;
                });
            await axios.post(BASE_API_URL+'content', { media:"blog" },{
                headers: {
                    'authorization': 'Bearer '+HomeData.TOKEN
                }}).then((response)=>{
                    HomeData.BLOGLIST = response.data[0].meditations;
                    fixUrls([...HomeData.BLOGLIST]);

                });
        }catch (e){
            console.error(e);
        }
    }catch (e){
        console.error(e);
    }
}
async function downloadAssets() {}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        width:"100%",
        flexGrow: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: 'center',
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
          color:'#fff',
          fontSize:23,
        textAlign: 'center',
      },

});


