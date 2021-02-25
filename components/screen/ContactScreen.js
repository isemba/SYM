import {Text, View, ScrollView, StyleSheet, ImageBackground, TextInput, Image, Keyboard, Dimensions, TouchableOpacity, Linking} from "react-native";
import React, { Component, useState } from "react";
import {Lato_100Thin, Lato_400Regular, useFonts} from "@expo-google-fonts/lato";
import Logo from "../Logo";
import Languages, {getLanguageText} from "../../utils/Language";
import CheckBox from '@react-native-community/checkbox';
import { CONTACT_URL } from "../../environement";
import * as axios from "axios";
import {HomeData} from "../../utils/Data";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const SocialIcon = ({source}) => (
    <TouchableOpacity
        onPress={()=>{

        }}
        style={{ paddingHorizontal: 15 }}
    >
        <Image style={styles.socialIcon} source={source} />

    </TouchableOpacity>
)
export class ContactScreen extends Component {
    constructor(props) {

		super(props);
		this.state = {
            email: "",
            name: "",
            message: ""
        };
	}


    onTextChange = (name) => (value) => {
        console.log(name);
        console.log(value);

        this.setState({ [name]: value });
        console.log(this.state);
      };


    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
    }
    async onSendClick(){
		Keyboard.dismiss();

		this.setState({
			resultError: false
		});
        console.log(this.state);
        let errObj={
            nameError:false,
            emailError:false,
            messageError:false
        };
		var err = false;
		if(!this.validateEmail(this.state.email)){
			err = true;
			errObj.emailError= true;
		}
		if(!this.state.nameOk){
			err = true;
			errObj.nameError= true;
        }
        if(this.state.message == null || this.state.message == undefined || this.state.message == ""){
			err = true;
			errObj.messageError= true;
		}

		console.log(errObj);

		if(!err){
			console.log('send message');
            try {
                console.log("send");
                console.log(HomeData.TOKEN)
                await axios.post(CONTACT_URL, { message:this.state.message },{
                    headers: {
                      'authorization': HomeData.TOKEN
                    }}).then((response)=>{console.log(response)});
            }catch (e){
                console.error(e);
            }
		}else{
            this.setState({
                emailError:errObj.emailError,
                nameError:errObj.nameError,
                messageError:errObj.messageError
            });
        console.log(this.state);

        }
	}
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground source={require('../../assets/images/bg-fire.png')} style={styles.image}>
                    <View style={styles.contactHolder}>
                        <View style={styles.logoContainer}>
                            <Logo />
                        </View>

                        <View style={styles.formHolder}>
                            <Text style={styles.formTitle}> {getLanguageText(Languages.CONTACT)} </Text>
                            <View style={[styles.inputHolder, {borderBottomColor: this.state.emailError ? "#ff0000":( this.state.emailActive? "rgba(255,255,255,1)":"rgba(255,255,255,0.5)") }]}>
                                <View style={styles.inputIcon}>
                                    <Image source={require('../../assets/images/form-email-icon.png')} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor='#A8A8A8'
                                    placeholder= {getLanguageText(Languages.FORM_EMAIL)}
                                    onChangeText={(text) => {
                                        let a = text.length > 0 ? true : false;
                                        let b = this.validateEmail(text) ? true : false;
                                        this.setState({
                                            email:text,
                                            emailActive:a,
                                            emailOk:b
                                        })
                                    }}
                                    onFocus={()=> this.setState({emailError:false})}
                                    value={this.state.email}
                                    />
                                <View style={[styles.inputCheck, {opacity : this.state.emailOk ? 1 : 0}]}>
                                    <Image source={require('../../assets/images/form-check-icon.png')} />
                                </View>
                            </View>
                            <View style={[styles.inputHolder, {borderBottomColor: this.state.nameError ? "#ff0000":( this.state.nameActive? "rgba(255,255,255,1)":"rgba(255,255,255,0.5)") }]}>
                                <View style={styles.inputIcon}>
                                    <Image source={require('../../assets/images/form-name-icon.png')} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor='#A8A8A8'
                                    placeholder= {getLanguageText(Languages.FORM_NAME)}
                                    onChangeText={(text) => {
                                        let a = text.length > 0 ? true : false;
                                        let b = text.length > 3 ? true : false;
                                        this.setState({
                                            name:text,
                                            nameActive:a,
                                            nameOk:b
                                        })
                                    }}
                                    onFocus={()=> this.setState({nameError:false})}
                                    value={this.state.name}
                                    />
                                <View style={[styles.inputCheck, {opacity : this.state.nameOk ? 1 : 0}]}>
                                    <Image source={require('../../assets/images/form-check-icon.png')} />
                                </View>
                            </View>
                            <View style={[styles.textAreaHolder, {borderColor: this.state.messageError ? "#ff0000":( this.state.messageActive? "rgba(255,255,255,1)":"rgba(255,255,255,0.5)")}]}>
                                <View style={[styles.textAreaTitleHolder, {borderBottomColor: this.state.messageActive ? "rgba(255,255,255,1)":"rgba(255,255,255,0.5)"}]}>
                                    <Text style={[styles.formTitle, {color: this.state.messageActive ? "rgba(255,255,255,1)":"rgba(255,255,255,0.5)"}]}> {getLanguageText(Languages.FORM_MESSAGE)} </Text>
                                </View>
                                <TextInput
                                    style={styles.textArea}
                                    multiline={true}
                                    numberOfLines={6}
                                    onChangeText={(text) => {
                                        let a = text.length > 0 ? true : false;
                                        this.setState({
                                            message:text,
                                            messageActive:a
                                        })
                                    }}
                                    onFocus={()=> this.setState({messageError:false})}
                                    value={this.state.message}/>
                            </View>
                            <View style={styles.checkBoxHolder}>
                                <CheckBox
                                    disabled={false}
                                    value={this.state.check}
                                    tintColors={ {true: "#fff", false: "rgba(255,255,255,0.5)"}}
                                    tintColor={'rgba(255,255,255,0.5)'}
                                    onCheckColor={'#fff'}
                                    onFillColor={'transparent'}
                                    onTintColor={'#fff'}
                                    onValueChange={(value) => this.setState({
                                        check: value,
                                    })}
                                />
                                <Text style={styles.checkBoxText}> {getLanguageText(Languages.FORM_CHECK)} </Text>
                            </View>
                            <TouchableOpacity style={styles.sendBtn} onPress={ ()=>{ this.onSendClick()}}>
                                <Text style={styles.sendBtnText}>{getLanguageText(Languages.FORM_SEND)}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialIcons}>
                            <SocialIcon source={require("../../assets/images/fbIcon.png")}/>
                            <SocialIcon source={require("../../assets/images/instagramIcon.png")}/>
                            {/* <SocialIcon source={require("../../assets/images/twitterIcon.png")}/>
                            <SocialIcon source={require("../../assets/images/whatsappIcon.png")}/> */}
                        </View>
                        <TouchableOpacity style={styles.linkBtn} onPress={ ()=>{ Linking.openURL('http://www.sahajayogaportal.org')}}>
                            <Text style={styles.linkBtnText}>www.sahajayogaportal.org</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        width:"100%",
        flexGrow: 1
    },
    contactHolder:{
        paddingTop:90,
        paddingBottom:50,
        paddingLeft:35,
        paddingRight:35
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "cover"
    },
    logoContainer: {
        paddingTop: 20,
        alignItems: "center",
        paddingBottom:35
    },
    formTitle:{
        fontSize:12,
        color:'#fff',
        fontFamily: "Lato_400Regular"
    },
    formHolder:{
        marginBottom:30
    },
    inputHolder:{
        marginBottom:10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingTop:12,
        paddingBottom:12,
        borderBottomWidth:1
    },
    inputIcon:{
        width:26,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    inputCheck:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        paddingRight:10
    },
    textAreaHolder:{
        borderWidth:1,
        borderRadius:10,
        paddingTop:10,
        paddingBottom:Lato_100Thin,
        paddingLeft:12,
        paddingRight:12,
        marginTop:20,
        marginBottom:26
    },
    textAreaTitleHolder:{
        borderBottomWidth:1,
        paddingBottom:4,
        fontSize:16,
        marginBottom:10
    },
    textInput:{
        height: 30,
        width: width-110,
        color:'#fff',
        paddingLeft:15,
        paddingRight:15,
        fontSize:15
    },
    textArea:{
        color:'#fff',
        fontSize:15,
        textAlignVertical : "top"
    },
    checkBoxHolder:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        marginBottom:20
    },
    checkBoxText:{
        color:'#fff',
        fontSize:12,
        paddingLeft:5
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
        justifyContent:"center"
    },
    socialIcons: {
        flexDirection: "row",
        justifyContent:"center",
        marginBottom: 20
    },
    socialIcon: {
        width: 50,
        height: 50
    },
    linkBtnText:{
        color:"#fff",
        fontSize:18,
        textDecorationLine:"underline",
        textAlign:"center"
    }

});

