import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import MeditationScreen from "./MeditationScreen";
import MusicScreen from "./MusicScreen";
import BlogScreen from "./BlogScreen";
import ProfileStackScreen from "./ProfileStackScreen";
import React from "react";
import {Color} from "../../utils/Colors";
const Tab = createBottomTabNavigator();

export default function TabStack(){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case "Today":
                            iconName = "ios-home";
                            break;
                        case "Meditation":
                            iconName = "ios-leaf";
                            break;
                        case "Music":
                            iconName = "md-musical-note";
                            break;
                        case "Blog":
                            iconName = "ios-book";
                            break;
                        case "Profile":
                            iconName = "ios-man";
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                style: {
                    backgroundColor: Color.MENU
                }
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'white',
                tabStyle: {
                    backgroundColor: Color.MENU
                }
            }}

        >
            <Tab.Screen name="Today" component={HomeScreen} options={{ title: "Bugün" }} />
            <Tab.Screen name="Meditation" component={MeditationScreen} options={{ title: "Meditasyon" }} />
            <Tab.Screen name="Music" component={MusicScreen} options={{ title: "Müzik" }} />
            <Tab.Screen name="Blog" component={BlogScreen} options={{ title: "Blog" }} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ title: "Profil" }} />
        </Tab.Navigator>
    )
}
