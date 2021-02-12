import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View, FlatList, ImageBackground } from 'react-native';
import { DiscoverList, HomeData } from "../../utils/Data";
import Languages, { getLanguageText } from '../../utils/Language';
import Card from '../Card';
import Title from "../Title";
import HeaderBar from "../HeaderBar";
import {LinearGradient} from "expo-linear-gradient";
import {Color} from "../../utils/Colors";
import {getMeditationGroups} from "../../utils/Utils";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class DiscoverScreen extends Component {

    flatListRef;
    headerListRef;
    headerLocked;
    state = {
        titles: [],
        discoverList : [],
        activeMeditationGroups: []
    }

    constructor(props){
        super(props);
        console.log(HomeData.DISCOVER);

        DiscoverList[0].active = true;

        DiscoverList.forEach(item => {
            item.groups = getMeditationGroups(item.meditations)
        })

        this.flatListRef = React.createRef();
        this.headerListRef = React.createRef();
    }

    componentDidMount(){

        this.setState({
            discoverList : DiscoverList
        })
    }

    changeActiveList = index => {
        console.log("changeActiveList to: " + index);
        DiscoverList.forEach((item, ind) =>{
            item.active = index === ind;
        });

        this.setState({
            discoverList : DiscoverList
        });

       try {
           this.flatListRef.current.scrollToIndex({index});

           this.headerListRef.current.scrollToIndex({index});
           this.headerLocked = true;

       }catch (e){

       }
    };

    renderHeaderItem = ({item, index}) => (
        <Title
            title={getLanguageText(item.title)}
            active={item.active}
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
        console.log("Visible items are", viewableItems);
       // console.log("Changed in this iteration", changed);


        if(!viewableItems || viewableItems.length == 0) return;

        const index = viewableItems[0].index;

        if(this.headerListRef != null){


            DiscoverList.forEach((item, ind) =>{
                item.active = index === ind;
            });

            this.setState({
                discoverList : DiscoverList
            });

            this.headerListRef.current.scrollToIndex({index});

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
                    data={discoverList}
                    keyExtractor={item => "header_"+ item.title.en}
                    renderItem={this.renderHeaderItem}
                />

                <FlatList
                    data={discoverList}
                    renderItem={this.renderScreen}
                    keyExtractor={item => item.title.en}
                    horizontal={true}
                    pagingEnabled={true}
                    ref={this.flatListRef}
                    onViewableItemsChanged={this.onViewableItemsChanged }
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
    const { lock, color, title, desc } = card;
    return (
        <Card
            key={"discover_card_" + index}
            lock={lock}
            color={color}
            size={size}
            title={getLanguageText(title)}
            desc={getLanguageText(desc)}
            source={require('../../assets/images/SampleImage.jpg')}
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
