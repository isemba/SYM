import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {navigationRef, navigate} from "./RootNavigation";
import TabStack from "./screen/TabStack";
import CustomizeScreen from "./screen/CustomizeScreen";


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
                        headerShown: false
                    }} />
                <MainStack.Screen name="Customize" component={CustomizeScreen} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}
