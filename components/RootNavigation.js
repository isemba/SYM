import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}
export async function setWelcome(){
    console.log("setWelcome")
    const setvalue = await AsyncStorage.setItem('@first', "true");
    const value = await AsyncStorage.getItem('@first');
    console.log("first value >>>")
    console.log(value);
}

