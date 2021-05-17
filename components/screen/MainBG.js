import React, {Component} from "react";
import {Dimensions, View, StyleSheet} from "react-native";
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../../models/CustomEvents";
import { Color } from "../../utils/Colors";
import { LinearGradient } from 'expo-linear-gradient';
//import { BlurView } from "@react-native-community/blur";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class MainBG extends Component{

    state = {
        bgOpacity: 0
    };


    componentDidMount() {
        EventEmitter.on(CustomEvents.BG_RATIO_CHANGED,this.updateBgRatio);
    }

    componentWillUnmount() {
        EventEmitter.off(CustomEvents.BG_RATIO_CHANGED, this.updateBgRatio);
    }

    updateBgRatio = bgOpacity =>{
        this.setState({bgOpacity});
    }

    render() {

        return(
            <LinearGradient
            colors={Color.MAIN_BG_GRADIENT}
            style={{
            width: windowWidth,
            height: windowHeight,
            position: "absolute",
            top: 0,
            left: 0,
            opacity: this.state.bgOpacity
        }} />
        )
    }
}
const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center"
    },
    absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  });
