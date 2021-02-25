import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {View, Text, StyleSheet, Image} from "react-native";
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
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../../models/CustomEvents";
const Tab = createBottomTabNavigator();

export default class TabStack extends Component {
    state = {
        bg:Color.BOTTOM_BG
    };

    componentDidMount() {
        this.setState({
            bg:Color.BOTTOM_BG
        })
        EventEmitter.on(CustomEvents.THEME_SELECTED, this.updateTheme);
    }

    componentWillUnmount() {
        EventEmitter.off(CustomEvents.THEME_SELECTED, this.updateTheme);
    }

    updateTheme = themeIndex => {
        console.log("Main Content THEME_SELECTED")
        this.setState({
            bg:Color.BOTTOM_BG
        })
    }

    updateTheme = themeIndex => {
        console.log("Main Content THEME_SELECTED")
        this.setState({
            bg:Color.BOTTOM_BG
        })
    }

    render(){
        return (
            <Tab.Navigator
                // tabBar={(props) => (<TabBar />)}
                screenOptions={({route}) => {
                    let iconName;
                    let iconImage;
                    let iconImagePassive;

                    switch (route.name) {
                        case "Today":
                            iconName = "ios-home";
                            iconImage = require('../../assets/images/bugun.png');
                            iconImagePassive = require('../../assets/images/bugun-off.png');
                            break;
                        case "Discover":
                            iconName = "ios-leaf";
                            iconImage = require('../../assets/images/kesfet.png');
                            iconImagePassive = require('../../assets/images/kesfet-off.png');
                            break;
                        case "Music":
                            iconName = "md-musical-note";
                            iconImage = require('../../assets/images/muzik.png');
                            iconImagePassive = require('../../assets/images/muzik-off.png');
                            break;
                        case "Blog":
                            iconName = "ios-book";
                            iconImage = require('../../assets/images/blog.png');
                            iconImagePassive = require('../../assets/images/blog-off.png');
                            break;
                        case "Profile":
                            iconImage = require('../../assets/images/profil.png');
                            iconImagePassive = require('../../assets/images/profil-off.png');
                            break;
                    }

                    return ({
                        tabBarIcon: ({ focused, color, size }) => {
                            //return <Ionicons name={iconName} size={size} color={color} />;
                            return <Image style={styles.icon} source={ focused? iconImage:iconImagePassive} />
                        }
                    })
                }}
                tabBarOptions={{
                    activeTintColor: 'white',
                    inactiveTintColor: '#767676',
                    tabStyle: {
                        backgroundColor: this.state.bg,
                    }
                }}

            >
                <Tab.Screen name="Today" component={HomeScreen} options={{ title: getLanguageText(Languages.TODAY),unmountOnBlur: true }} />
                <Tab.Screen name="Discover" component={DiscoverScreen} options={{ title: getLanguageText(Languages.DISCOVER),unmountOnBlur: true }} />
                <Tab.Screen name="Music" component={MusicScreen} options={{ title: getLanguageText(Languages.MUSIC),unmountOnBlur: true }} />
                <Tab.Screen name="Blog" component={BlogStackScreen} options={{ title: getLanguageText(Languages.BLOG),unmountOnBlur: true }} />
                <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ title: getLanguageText(Languages.PROFILE),unmountOnBlur: true }} />
            </Tab.Navigator>
        )
    }
}

class TabBar extends Component{
    state={
        tabs: [
            { iconImage:"bugun", iconName: "ios-home", title: Languages.TODAY, active: true, address: ""  },
            { iconImage:"kesfet",iconName: "ios-leaf", title: Languages.DISCOVER },
            { iconImage:"muzik",iconName: "md-musical-note", title: Languages.MUSIC },
            { iconImage:"blog",iconName: "ios-book", title: Languages.BLOG },
            { iconImage:"profil",iconName: "ios-man", title: Languages.PROFILE },
        ]
    }

    render() {
        return (
            <View style={styles.tabContainer}>
                { this.state.tabs.map((item, index) => (
                    <View style={styles.tabItem} key={"tab_" + index}>
                        <Image style={[styles.icon, { opacity: item.active ? '0' : '1' }]} source={require('../../assets/images/bugun.png')} />
                        <Text style={[styles.tabItemText, { color: item.active ? '#767676' : 'white' }]}>{getLanguageText(item.title)}</Text>
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
        textAlign:"center"
    },
    icon:{
        width:30,
        height:30,
        paddingTop:5
    }
});
