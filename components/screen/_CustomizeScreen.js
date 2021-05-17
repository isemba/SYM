import {ActivityIndicator, Text, View, Picker, Slider, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, ScrollView, Image} from "react-native";
import React, { Component } from "react";
import Card from "../Card";
import {ChangeTheme, Color, ColorSettings} from "../../utils/Colors";
import MenuIcon from "./MenuIcon";
import {LinearGradient} from "expo-linear-gradient";
import HeaderBar from "../HeaderBar";
import {MediaType} from "../../utils/EnumTypes";
import { HomeData } from "../../utils/Data";
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../../models/CustomEvents";
import * as FileSystem from 'expo-file-system';
import {setTheme} from "../RootNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CustomizeScreen extends Component{
    // const themes = [
    //     {source: require('../../assets/images/theme1.jpg')},
    //     {source: require('../../assets/images/theme2.jpg')},
    //     {source: require('../../assets/images/theme3.jpg')},
    //     {source: require('../../assets/images/theme4.jpg')}
    // ]
    //const 

    constructor(props){
        super(props);
        this.state ={
            downloading:-1,
            minutes:[]
        }
        that = this;
    }
    async componentDidMount(){
        var minute = [];
        for(var i=0;i < 60;i+=5){
            minute.push({val:i, label:i+" dk."});
        }
        const bgtimer = await AsyncStorage.getItem('@bgtimer');
        let m;
        if(bgtimer !== null) {              
            //console.log("has bgtimer");
            //console.log(bgtimer);
            m =  parseInt(bgtimer);                
        }else{
            m = 0;
        }
        this.setState({
            minutes: minute,
            selectedMinute:m
        });
    }
    async checkTheme(index){
        /*//console.log("checkTheme");
        //console.log(index);*/
        setTheme(index);
        if(HomeData.THEMES[index].downloaded){
            ChangeTheme(index);
            EventEmitter.emit(CustomEvents.THEME_SELECTED, index);
        }else{
            that.setState({downloading:index})
            let downloadResumable = FileSystem.createDownloadResumable(
                HomeData.THEMES[index].video,
                FileSystem.documentDirectory + HomeData.THEMES[index].filename,
                {}
              );
              try {
                let { uri } = await downloadResumable.downloadAsync();
                //console.log('Finished downloading to ', uri);
                let info = await FileSystem.getInfoAsync(FileSystem.documentDirectory+HomeData.THEMES[index].filename);
                //console.log(info);
                HomeData.THEMES[index].downloaded = true;
                HomeData.THEMES[index].bg = FileSystem.documentDirectory+HomeData.THEMES[index].filename;
                that.setState({downloading:-1});
                ChangeTheme(index);
                EventEmitter.emit(CustomEvents.THEME_SELECTED, index);
              } catch (e) {
                console.error(e);
              }
        }
    }

    checkCover(theme, index){
        /*//console.log(this.state.downloading);
        //console.log(index);*/
        if(!theme.downloaded){

            if(this.state.downloading == index){
                return(
                    <View style={styles.cover} pointerEvents="none">
                    <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                )
            }else{
                return(
                    <View style={styles.cover} pointerEvents="none">
                    </View>
                )
            }
        }else{
            return null
        }
    }
async onValueChange(value){
    ////console.log("onValueChange");
    ////console.log(value);
    HomeData.BG_MUSIC.volume = value;
    EventEmitter.emit(CustomEvents.BG_VOLUME, value);
    const bgvolume = await AsyncStorage.setItem('@bgvolume', value.toString())
}
async setBgMinutes(m){
    this.setState({ selectedMinute:m })
    const bgminutes = await AsyncStorage.setItem('@bgtimer', m.toString())
}
    render(){
        let minuteItems = this.state.minutes.map( (s, i) => {
            return <Picker.Item key={i} value={s.val} label={s.label} />
        });
    return (

        <LinearGradient style={styles.container} colors={Color.MAIN_BG_GRADIENT}>
            <HeaderBar title="Sahneler" size={60} />
            <MenuIcon navigateTo={"Main"}/>

        <View style={styles.topBar}>
        <LinearGradient
                style={styles.topGradient}
                colors={Color.HEADER_GRADIENT}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
            >
            <View style={[styles.settingsHolder, {marginBottom:20}]}>
                <Text style={styles.topText}>Sahne Ses Seviyesi</Text>
                <View style={[styles.row, {width:"80%"}]}>
                    <Image source={require('../../assets/images/volume-down.png')} style={styles.icon} />
                    <Slider
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#0A84FF"
                    maximumTractTintColor="rgba(120,120,128,0.2)"
                    step={1}
                    value={HomeData.BG_MUSIC.volume}
                    onSlidingComplete={value => this.onValueChange(value)}
                    style={styles.slider}
                    thumbTintColor="#ffffff"
                    />
                    <Image source={require('../../assets/images/volume-up.png')} style={styles.icon} />
                </View>
            </View>
            {/* <View style={styles.settingsHolder}>
                <Text style={styles.topText}>Uygulamadan çıkınca çalmaya devam et</Text>
                <View>
                    <Picker
                    selectedValue={this.state.selectedMinute}
                    onValueChange={m =>this.setBgMinutes(m)}
                    style={{ width: 120, color:"#fff", paddingRight:0 }}
                    mode="dropdown">                       
                        {minuteItems}
                    </Picker>
                </View>
                <View style={styles.row}>
                    <Image source={require('../../assets/images/timer.png')} style={{}} />
                </View>
            </View> */}
            </LinearGradient>
        </View>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft:20
                }}
            >
                { HomeData.THEMES.map((theme, index) => {
                    ////console.log("ColorSettings.SelectedTheme: " + ColorSettings.SelectedTheme);
                    ////console.log(theme.downloaded);
                    const cardStyles = index === ColorSettings.SelectedTheme ? [styles.cardContainer, styles.active] : [styles.cardContainer, theme.downloaded ? styles.normal : styles.inactive];
                    ////console.log(cardStyles)
                    return (
                        <View style={cardStyles} key={"theme_"+index}>
                            <Card lock={false} color={Color.MENU} source={{uri:theme.image}} themeIndex={index} media={MediaType.THEME} style={{marginBottom:0, height:"100%"}} callback={this.checkTheme}/>
                            {this.checkCover(theme, index)}
                        </View>
                    )
                }) }
            </ScrollView>

        </LinearGradient>
    );
            }
}
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const radios = 15;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    topBar:{
        marginTop:-10
    },
    topGradient:{
        padding:20
    },
    settingsHolder:{
        display:"flex",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
        paddingLeft:20,
        paddingRight:20
    },
    row:{
        display:"flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems:"center",
    },
    topText:{
        color:'#fff',
        fontSize:10,
        marginRight:15
    },
    icon:{
        marginRight:-5
    },
    slider:{
        width:"60%"
    },
    cardContainer: {
        margin: 10,
    },
    active: {
        borderWidth: 2,
        borderRadius: 17,
        borderColor: Color.LIGHT,
        transform:[{scale:1.1}]
    },
    inactive:{
        //opacity:0.5
    }, 
    cover:{
        position:"absolute",
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 15,
        backgroundColor:"rgba(0,0,0,0.9)",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
});
//export default CustomizeScreen;
