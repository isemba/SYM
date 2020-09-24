import {Text, View, StyleSheet} from "react-native";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {navigate} from "../RootNavigation";
import Video from "react-native-video";

export default function HomeScreen() {
    const videoError = (err) => {
        console.log("Video Error", err);
    };

    const onBuffer = (buff) => {
        console.log("Buffer", buff);
    };

    return (
        <View>
            {/*<Video source={{uri: "../../assets/video/Alis.mp4"}}   // Can be a URL or a local file.*/}
            {/*       ref={(ref) => {*/}
            {/*           this.player = ref*/}
            {/*       }}                                      // Store reference*/}
            {/*       onBuffer={onBuffer}                // Callback when remote video is buffering*/}
            {/*       onError={videoError}               // Callback when video cannot be loaded*/}
            {/*       style={styles.backgroundVideo}*/}
            {/*/>*/}

            <Ionicons
                name={'ios-aperture'}
                size={12}
                color={'#000'}
                style={{ padding: 10, fontSize:20 }}
                onPress={()=>{
                    navigate('Customize');
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});
