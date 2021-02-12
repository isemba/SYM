import React from "react";
import {Image} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {navigationRef, navigate} from "./RootNavigation";
import TabStack from "./screen/TabStack";
import CustomizeScreen from "./screen/CustomizeScreen";
import VideoScreen from "./screen/VideoScreen";


const MainStack = createStackNavigator();
export default function Navigation() {
    return  (
        <NavigationContainer ref={navigationRef}>
            <MainStack.Navigator>
                <MainStack.Screen
                    name="Main"
                    component={TabStack}
                    options={{
                        title : "",
                        headerShown: false,
                        gestureEnabled: true
                    }} />
                <MainStack.Screen name="Customize" component={CustomizeScreen} options={{
                    headerBackTitleVisible: false,
                    headerTitle: "",
                    headerTransparent: true,
                    headerShown:false
                }} />
                <MainStack.Screen name="Video" component={VideoScreen} options={{
                    title : "",
                    headerTransparent: true,
                    headerBackTitleVisible: false,
                    headerBackImage: ()=>(<Image source={require('../assets/images/back.png')} resizeMode="center" style={{ width: 32, height: 32 }} />),
                    cardStyle: { opacity: 1, backgroundColor: 'rgba(0,0,0,.9)' },
                    transparentCard: true
                }} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}
