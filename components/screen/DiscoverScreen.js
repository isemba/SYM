import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View, FlatList, ImageBackground } from 'react-native';
import { HomeData } from "../../utils/Data";
import Languages, { getLanguageText } from '../../utils/Language';
import Card from '../Card';
import Title from "../Title";
import HeaderBar from "../HeaderBar";
import {LinearGradient} from "expo-linear-gradient";
import {Color} from "../../utils/Colors";
import {getMeditationGroups} from "../../utils/Utils";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var DiscoverList;
class DiscoverScreen extends Component {

    flatListRef;
    headerListRef;
    headerLocked = false;
    state = {
        titles: [],
        discoverList : [],
        activeMeditationGroups: [],
        activeIndex:0
    }

    constructor(props){
        super(props);
        //console.log(HomeData.DISCOVER);
        DiscoverList = HomeData.VIDEOLIST;

        DiscoverList[0].active = true;

        DiscoverList.forEach(item => {
            item.groups = getMeditationGroups(item.meditations)
        })
        //this.state.discoverList = DiscoverList;
        
        this.dList = DiscoverList;
        this.flatListRef = React.createRef();
        this.headerListRef = React.createRef();
    }

    componentDidMount(){

        /*this.setState({
            discoverList : DiscoverList
        })*/
    }

    changeActiveList = index => {
        console.log("changeActiveList to: " + index);
        /*DiscoverList.forEach((item, ind) =>{
            item.active = index === ind;
        });

        this.setState({
            discoverList : DiscoverList
        });*/
        this.setState({
            activeIndex : index
        });
       try {
           this.headerLocked = true;
           this.headerListRef.current.scrollToIndex({index});
           this.flatListRef.current.scrollToIndex({index});

           
           setTimeout(() => {
            this.headerLocked = false;
           }, 1000);

       }catch (e){

       }
    };

    renderHeaderItem = ({item, index}) => (
        <Title
            //title={getLanguageText(item.title)}
            title={item.title}
            active={this.state.activeIndex == index}
            key={"discoverTitle_" + index}
            onPress={() => {
                this.changeActiveList(index);
            }}
        />
    )

    renderScreen = ({item: { groups }, index}) => (
        <ScrollView
            contentContainerStyle={styles.discoverContainer}
            showsVerticalScrollIndicator={false}
            key={"discover_screen_"+index}
        >
            {
                groups.map((group, index) => (addMeditationCards(group, index)))
            }

            <View style={{height: windowHeight / 10}}/>
        </ScrollView>
    )

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        //console.log("Visible items are", viewableItems);
       // console.log("Changed in this iteration", changed);


        if(!viewableItems || viewableItems.length == 0) return;

        const index = viewableItems[0].index;

        this.setState({
            activeIndex : index
        });
        if(this.headerListRef != null){


            /*DiscoverList.forEach((item, ind) =>{
                console.log("discoverlist item");
                console.log(item);
                item.active = index === ind;
            });

            this.setState({
                discoverList : DiscoverList
            });*/

            console.log("onViewableItemsChanged > "+this.headerLocked)
            if(!this.headerLocked){
                this.headerListRef.current.scrollToIndex({index});
            } 

        }


    }

    render() {
        const { discoverList } = this.state;

        return (

            <ImageBackground source={Color.BG_IMAGE} style={styles.image}>
                <HeaderBar title={getLanguageText(Languages.DISCOVER)} />
                <FlatList
                    style={styles.container}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={this.headerListRef}
                    data={this.dList}
                    keyExtractor={item => "header_"+ item.title}
                    renderItem={this.renderHeaderItem}
                    contentContainerStyle={{paddingRight:20}}
                />

                <FlatList
                    data={this.dList}
                    renderItem={this.renderScreen}
                    keyExtractor={item => item.title}
                    horizontal={true}
                    pagingEnabled={true}
                    ref={this.flatListRef}
                    scrollEnabled={false}
                    //onViewableItemsChanged={this.onViewableItemsChanged }
                />
            </ImageBackground>
        )
    }

}

function addMeditationCards(group, groupIndex){
    const groupSize = group.length;

    if(groupSize === 1 && groupIndex === 0){
        const card = group[0];
        return (
            getCard(card, 0, 96)
        )
    }

    return (
        <View style={styles.cardContainer} key={"discover_card_container_" + groupIndex}>
            {
                group.map((card, index)=>( getCard(card, index, 47) ))
            }
        </View>
    )
}

function getCard(card, index, size){
    const { lock, color, title, desc, image, url } = card;
    return (
        <Card
            key={"discover_card_" + index}
            lock={lock}
            color={color}
            size={size}
            title={title}
            desc={desc}
            //source={require('../../assets/images/SampleImage.jpg')}
            source={{uri:image}}
            uri={url}
        />
    )
}



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: windowWidth / 50,
        marginBottom: 5

    },
    discoverContainer: {
        padding: windowWidth / 50,
        width: windowWidth,
        flexGrow : 1,

    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between"

    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "cover"   
    }
});


export default DiscoverScreen;
