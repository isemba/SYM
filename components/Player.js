import React, { Component } from 'react';
import { Audio } from 'expo-av';
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../models/CustomEvents";
import {HomeData} from "../utils/Data";

export default class audioPlayer extends Component{
    static instance = null;
    shouldPlay = false;
    static createInstance() {
        var object = new audioPlayer();
        return object;
    }

    _tUrl;
    _radioStream;

    /**
     * @returns {audioPlayer}
     */
    static getInstance() {
        if (audioPlayer.instance == null) {
            audioPlayer.instance = audioPlayer.createInstance();
        }

        return audioPlayer.instance;
    }

    // Call this first to create a new audio element
    async createAudio() {
        /*await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            staysActiveInBackground: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
          });*/
        this._radioStream = new Audio.Sound();
        this._tUrl = "";
        EventEmitter.on(CustomEvents.BG_VOLUME, volume =>{
            this.setVolume(volume);
        });
    };

    async setVolume(volume){
        console.log("volume > "+volume)
        this._radioStream.setVolumeAsync(volume/100);
    }
    async loadAudioAsync(url) {
        console.log("loadAudioAsync");
        console.log(url)
        console.log(this._tUrl)
        let { isLoaded, isPlaying } = await this._radioStream.getStatusAsync();
        if(url !== this._tUrl){
            try {

                this._tUrl=url;
                if (isLoaded) {
                    if(isPlaying)this.toggleAudio(false);
                    await this.unloadAudioAsync();
                    console.log("unloaded")
                }
                console.log("loading");
                await this._radioStream.loadAsync(
                    { uri: url},
                );
                //store.dispatch(setLiveState(true));
                this.setVolume(HomeData.BG_MUSIC.volume)
                this.toggleAudio(this.shouldPlay); // Autoplay at start
                console.log("playing");
                return true;

            } catch (error) {
                if (error.code === "E_LOAD_ERROR") {
                    // In the case of an error we try to load again
                    setTimeout(this.loadAudioAsync, 10000);

                    throw new Error(error.code);
                } else {
                    throw new Error(error);
                };
            };
        }

    };

    async unloadAudioAsync() {
        await this._radioStream.unloadAsync();
    };

    async getStatusAsync() {
        return await this._radioStream.getStatusAsync();
    };

    async toggleAudio(shouldplay) {
        // We're gonna play or pause depending on the status
        let { isLoaded, isPlaying } = await this._radioStream.getStatusAsync();

        // If the user presses the audio and the stream connection has been lost or something
        // we try to load it again
        /*if (!isLoaded) {
          let res = await this.loadAudioAsync(); // Try to loadAudio again
          if (res) this.toggleAudio(); // Retrigger the toggle to start playing
        }*/

        console.log("toggleAudio > "+shouldplay +" / "+isLoaded+ " / "+isPlaying)
        if (isLoaded && !isPlaying && shouldplay) {
            //store.dispatch(setPlayingStatus(true));
            await this._radioStream.playAsync();
        } else if (isLoaded && isPlaying && !shouldplay) {
            //store.dispatch(setPlayingStatus(false));
            await this._radioStream.stopAsync();
        };
    };
};
