import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}
export async function setWelcome(){
    console.log("setWelcome")
    const setvalue = await AsyncStorage.setItem('@welcomeVideoShown', "true");
    const value = await AsyncStorage.getItem('@welcomeVideoShown');
    console.log("first value >>>")
    console.log(value);
}
export async function setTheme(index){
    console.log("setWelcome")
    const setvalue = await AsyncStorage.setItem('@themeIndex', index.toString());
    const value = await AsyncStorage.getItem('@themeIndex');
    console.log("themeIndex value >>>")
    console.log(value);
}



