import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {View, Text, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import DiscoverScreen from "./DiscoverScreen";
import MusicScreen from "./MusicScreen";
import BlogScreen from "./BlogScreen";
import ProfileStackScreen from "./ProfileStackScreen";
import React, {Component} from "react";
import {Color} from "../../utils/Colors";
import Languages, {getLanguageText} from "../../utils/Language";
import BlogStackScreen from "./BlogStackScreen";
const Tab = createBottomTabNavigator();

export default class TabStack extends Component {

    render(){
        return (
            <Tab.Navigator
                // tabBar={(props) => (<TabBar />)}
                screenOptions={({route}) => {
                    let iconName;
                    switch (route.name) {
                        case "Today":
                            iconName = "ios-home";
                            break;
                        case "Discover":
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

                    return ({
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons name={iconName} size={size} color={color} />;
                        }
                    })
                }}
                tabBarOptions={{
                    activeTintColor: 'white',
                    inactiveTintColor: 'grey',
                    tabStyle: {
                        backgroundColor: Color.MENU,
                    }
                }}

            >
                <Tab.Screen name="Today" component={HomeScreen} options={{ title: getLanguageText(Languages.TODAY) }} />
                <Tab.Screen name="Discover" component={DiscoverScreen} options={{ title: getLanguageText(Languages.DISCOVER) }} />
                <Tab.Screen name="Music" component={MusicScreen} options={{ title: getLanguageText(Languages.MUSIC) }} />
                <Tab.Screen name="Blog" component={BlogStackScreen} options={{ title: getLanguageText(Languages.BLOG) }} />
                <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ title: getLanguageText(Languages.PROFILE) }} />
            </Tab.Navigator>
        )
    }
}

class TabBar extends Component{
    state={
        tabs: [
            { iconName: "ios-home", title: Languages.TODAY, active: true, address: ""  },
            { iconName: "ios-leaf", title: Languages.DISCOVER },
            { iconName: "md-musical-note", title: Languages.MUSIC },
            { iconName: "ios-book", title: Languages.BLOG },
            { iconName: "ios-man", title: Languages.PROFILE },
        ]
    }

    render() {
        return (
            <View style={styles.tabContainer}>
                { this.state.tabs.map((item, index) => (
                    <View style={styles.tabItem} key={"tab_" + index}>
                        <Ionicons name={item.iconName} size={20} color={item.active ? 'purple' : 'white'} />
                        <Text style={[styles.tabItemText, { color: item.active ? 'purple' : 'white' }]}>{getLanguageText(item.title)}</Text>
                    </View>
                )) }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: "row"
    },
    tabItem: {
        backgroundColor: Color.LIGHT,
        padding: 5,
        overflow: "hidden",
        textAlign: "center",
        alignItems: "center",
        flex: 1
    },
    tabItemText: {
    }
});
