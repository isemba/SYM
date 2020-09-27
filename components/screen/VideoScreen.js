import {Video} from "expo-av";
import React, { Component } from "react";
import {Dimensions, StyleSheet, View, StatusBar} from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class VideoScreen extends Component{

    render() {
        const { route } = this.props;
        if(!route) return null;
        const {  params: { uri } } = route;

        return (
            <View>
                <StatusBar hidden={true} />
                <Video source={{ uri }}  // Can be a URL or a local file.
                       rate={1.0}                                     // Store reference
                       volume={1.0}
                       isMuted={false}
                       resizeMode={Video.RESIZE_MODE_STRETCH}
                       style={styles.backgroundVideo}
                       shouldPlay={false}
                       isLooping={false}
                       orientation="landscape"
                       useNativeControls={true}
                       onLoadStart={()=>{
                           console.log("video started!");
                       }}
                       onLoad={ status =>{
                           console.log("video loaded with status: ", status);
                       }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    backgroundVideo: {
        position: "absolute",
        top: windowHeight / 3,
        left: 0,
        width: windowWidth,
        height: windowHeight / 3
    }
});
