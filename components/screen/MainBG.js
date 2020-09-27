import React, {Component} from "react";
import {Dimensions, View} from "react-native";
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../../models/CustomEvents";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class MainBG extends Component{

    state = {
        bgOpacity: 0
    };

    componentDidMount() {
        EventEmitter.on(CustomEvents.BG_RATIO_CHANGED,bgOpacity =>{
            this.setState({bgOpacity});
        });
    }

    componentWillUnmount() {

    }

    render() {
        const backgroundColor = "rgba(13, 25, 163, "+ this.state.bgOpacity +")";

        return(
            <View style={{
                backgroundColor,
                width: windowWidth,
                height: windowHeight,
                position: "absolute",
                top: 0,
                left: 0
            }} />
        )
    }
}
