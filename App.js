import 'react-native-gesture-handler';
import React from 'react';
import Navigation from "./components/Navigation";
import {SafeAreaView, View, Text} from "react-native";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <Navigation />
        </SafeAreaView>
    );
}
