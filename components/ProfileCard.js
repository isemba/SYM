import React, { Component, useState, useEffect, useRef } from 'react';
import { Share, Linking,Button, Dimensions, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, Switch, Platform, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Color } from "../utils/Colors";
import {Lato_400Regular, Lato_100Thin, useFonts} from "@expo-google-fonts/lato";
import { useNavigation } from '@react-navigation/native';
import { HomeData } from "../utils/Data";
import Languages, {getLanguageText} from "../utils/Language";

//import { captureRef } from 'react-native-view-shot';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { render } from 'react-dom';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileCard() {

    const navigation = useNavigation();

    const [fontLoaded] = useFonts({ Lato_400Regular, Lato_100Thin});
    const [strike, setStrike] = useState(HomeData.STATS.days);
    const [joinCount, setJoinCount] = useState(HomeData.STATS.totalMeditations);
    const [joinTime, setJoinTime] = useState(HomeData.STATS.totalDuration);
    const [joinStrike, setJoinStrike] = useState(HomeData.STATS.days);
    const [reminders, setReminders] = useState(false);
    const [remindHour, onChangeRemindHour] = useState(9);
    const [remindMinute, onChangeRemindMinute] = useState(40);
    const [appleHealth, setAppleHealth] = useState(false);
    const [remindDays, setRemindDays] = useState([
        {text: "P", open: false},
        {text: "S", open: false},
        {text: "Ç", open: false},
        {text: "P", open: false},
        {text: "C", open: false},
        {text: "C", open: false},
        {text: "P", open: false},
    ]);
    const [renderMe, setRenderMe] = useState(false);
    //const { onCapture } = useCapture();
    const viewShotRef = useRef();

    const onCapture = ()=> {
        console.log("onCapture");
        //console.log(viewShotRef && viewShotRef.current)
        viewShotRef.current.capture().then(uri => {
            console.log('Image saved to', uri);
            Sharing.shareAsync('file://' + uri);
          },
        error => alert("Oops, snapshot failed", error));
    }
    const InfoArea = ({ text, count }) => (
        <View style={{flex: 1}}>
            <Text style={styles.infoLabel}>{text}</Text>
            <Text style={styles.infoCount}>{count}</Text>
        </View>
    );

    const SocialIcon = ({source, link}) => (
        <TouchableOpacity
            onPress={()=>{
                Linking.openURL(link)
            }}
            style={{ paddingHorizontal: 15 }}
        >
            <Image style={styles.socialIcon} source={source} />

        </TouchableOpacity>
    )

    const SwitchArea = ({text, value, setValue}) => (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width : windowWidth * 9 / 10,
            marginBottom: 10
        }}>
            <Text style={styles.text}>{text}</Text>
            <Switch
                value={value}
                onValueChange={v => {
                    setValue(v);
                }}
            />
        </View>
    )

    const RemindersBar = ({days}) => (
        <View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width : windowWidth * 9 / 10,
                marginTop: 10,
                marginBottom: 20,
            }}>
                {days.map((day, index) => (
                    <View style={styles.reminder} key={"reminder_day_"+index}>
                        <Text style={[styles.text, { paddingTop: 5, paddingBottom: 6 }]}>{day.text}</Text>
                        <TouchableWithoutFeedback
                            onPress={()=>{
                                days[index].open = !days[index].open;
                                setRenderMe(val => !val);
                            }}
                        >
                            <View style={[styles.reminderIcon, { backgroundColor: day.open ? "#32d74b" : "#000" }]}/>

                        </TouchableWithoutFeedback>
                    </View>
                ))}
            </View>
            <View style={{
                flexDirection: "row",
                marginTop: 5,
                marginBottom: 20,
                justifyContent: "center",
                alignItems:"center"
            }}>
                <Text style={[styles.text, { fontSize: 20 ,marginTop:2, marginRight:5 }]}>Saat </Text>
                <View style={{display:"flex", flexDirection:"row",paddingTop:6,paddingBottom:6, paddingLeft:10, paddingRight:10, backgroundColor:"rgba(118,118,128,0.12)", borderRadius:5}}>
                <TextInput
                    style={[styles.text, { fontSize: 20, textAlign:"right" }]}
                    onChangeText={text => onChangeRemindHour(text)}
                    numeric={true}
                    keyboardType={'numeric'}
                    value={remindHour+""}
                />
                <Text style={[styles.text, { fontSize: 20 }]}> : </Text>
                <TextInput
                    style={[styles.text, { fontSize: 20 }]}
                    onChangeText={text => onChangeRemindMinute(text)}
                    value={remindMinute+""}
                    numeric={true}
                    keyboardType={'numeric'}
                /></View>

            </View>
            <TouchableOpacity style={styles.sendBtn} onPress={ ()=>{ onNotificationClick()}}>
                <Text style={styles.sendBtnText}>{getLanguageText(Languages.NOTIFICATIONS)}</Text>
            </TouchableOpacity>
        </View>
    )


    const onNotificationClick = ()=>{
        console.log("onNotificationClick");
        console.log(remindDays);
        console.log(remindHour);
        console.log(remindMinute);
        registerForPushNotificationsAsync().then(token => {
            setToken(token);
          });
          enableNotification();
    }
    const enableNotification = async ()=>{
        Notifications.cancelAllScheduledNotificationsAsync();
        console.log("enableNotification");
        let sch = { 
            hour:  parseInt(remindHour),
            minute: parseInt(remindMinute),
            repeats: true
         }
         console.log(sch);
        await Notifications.scheduleNotificationAsync({
            content: {
              title: Languages.NOTIFICATIONS_TITLE,
              body: Languages.NOTIFICATIONS_BODY,
            },
            trigger: sch
          });
      }

    const [token, setToken] = useState(null);
    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [250, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }
     
    return (
        <ScrollView contentContainerStyle={styles.container}>
           <View style={styles.profileArea}>
               

               <ViewShot
                style={styles.screenShot}
                ref={viewShotRef}
                options={{format: 'jpg', quality: 0.9}}>
                <ImageBackground style={styles.strikeImage} source={require('../assets/images/rozet.png')}>
                   <Text style={styles.strikeText}>{strike}</Text>
               </ImageBackground>
                <View style={styles.infoArea}>
                    <InfoArea text="KATILDIĞI MEDiTASYONLAR" count={joinCount}/>
                    <InfoArea text="MEDiTASYONDAKi DAKiKALARIN" count={joinTime}/>
                    <InfoArea text="ART ARDA GÜNLERiN" count={joinStrike}/>
                </View>
               </ViewShot>
               <TouchableOpacity style={styles.shareArea} onPress={onCapture}>
                   <Image source={require("../assets/images/export.png")} />
                   <Text style={[styles.text, { paddingTop: 2, marginLeft: 5 }]}>İstatistiklerini Paylaş</Text>
               </TouchableOpacity>
           </View>

            <View >
                <TouchableOpacity
                    style={{ marginVertical: 10 }}
                >
                    <Text style={styles.text}>Takvim ve Geçmiş > </Text>
                </TouchableOpacity>
                
                
                <SwitchArea text="Anımsatıcılar" value={reminders} setValue={setReminders}/>
                { reminders ? <RemindersBar days={remindDays} /> : null }

                { Platform.OS === "ios" ? <SwitchArea text="Apple Sağlık" value={appleHealth} setValue={setAppleHealth}/> : null }
                <TouchableOpacity
                    style={{ marginBottom: 10 }} onPress={()=>{
                        navigation.navigate('Faq');
                    }}
                >
                    <Text style={styles.text}>Sıkça Sorulan Sorular </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginBottom: 10 }} onPress={()=>{
                        navigation.navigate('Contact');
                    }}
                >
                    <Text style={styles.text}>Bize Ulaşın </Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.socialLabel}>Bizi Tavsiye Edin</Text>
                <View style={styles.socialIcons}>
                <SocialIcon source={require("../assets/images/fbIcon.png")} link={"https://www.facebook.com/Sahaja-Yoga-Meditasyon-112360240901664"}/>
                <SocialIcon source={require("../assets/images/instagramIcon.png")} link={"http://www.instagram.com/sahajayogameditasyon/"}/>
                    {/* <SocialIcon source={require("../assets/images/twitterIcon.png")}/>
                    <SocialIcon source={require("../assets/images/whatsappIcon.png")}/> */}
                </View>
            </View>

        </ScrollView>
    )
       
            

};



const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1,
        paddingBottom:50
    },
    profileArea: {
        alignItems: "center",
        marginTop: 60
    },
    shareArea: {
        borderColor: "#7A51B9",
        borderRadius: 25,
        borderWidth: 3,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10
    },
    socialIcons: {
        flexDirection: "row",
        marginBottom: 10
    },
    text: {
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 18,
        fontFamily: "Lato_400Regular"
    },
    backGround:{
        backgroundColor: '#280d52'
    },
    screenShot:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    strikeImage: {
        width: 200,
        height: 100,
        marginBottom: 10
    },
    strikeText: {
        color: Color.LIGHT_TEXT_COLOR,
        fontFamily: "Lato_400Regular",
        fontSize: 24,
        textAlign: "center",
        paddingTop: 18
    },
    infoArea :{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: windowWidth - 20,
        marginLeft:5
    },
    infoLabel: {
        fontFamily: "Lato_400Regular",
        color: Color.LIGHT_TEXT_COLOR,
        opacity: 0.6,
        textAlign: "center",
        fontSize: 10
    },
    infoCount: {
        fontFamily: "Lato_400Regular",
        color: Color.LIGHT_TEXT_COLOR,
        textAlign: "center"
    },
    socialLabel: {
        fontFamily: "Lato_400Regular",
        color: Color.LIGHT_TEXT_COLOR,
        textAlign: "center",
        paddingVertical: 10
    },
    socialIcon: {
        width: 50,
        height: 50
    },
    reminder : {
        borderRadius: 12,
        backgroundColor: "#9E9E9E",
        width: 34,
        height: 54,
        alignItems: "center"
    },
    reminderIcon: {
        borderRadius: 50,
        width: 28,
        height: 28,
        marginTop: 0,
        borderColor: "#707070",
        borderWidth: 2
    },
    sendBtn:{
        width:150,
        height:40,
        borderRadius:20,
        backgroundColor:"#fff",
        color:"#000",
        fontSize:18,
        marginLeft:"auto",
        marginRight:"auto",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:20
    },
});
