import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { DiscoverList } from "../../utils/Data";
import Languages, { getLanguageText } from '../../utils/Language';
import Card from '../Card';
import Title from "../Title";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class DiscoverScreen extends Component {

    flatListRef;
    headerListRef;
    state = {
        titles: [],
        discoverList : [],
        activeMeditationGroups: []
    }

    constructor(props){
        super(props);
        DiscoverList[0].active = true;

        DiscoverList.forEach(item => {
            item.groups = this.getMeditationGroups(item.meditations)
        })

        this.flatListRef = React.createRef();
        this.headerListRef = React.createRef();
    }

    componentDidMount(){


        this.setState({
            discoverList : DiscoverList
        })
    }

    getMeditationGroups(meditations) {
        const activeMeditationGroups = [];
        let groupIndex = -1;
        for(let i = 0; i < meditations.length; i++){
            const med = meditations[i];

            if(i % 2 === 0){
                groupIndex++;
                activeMeditationGroups[groupIndex] = [];
            }

            activeMeditationGroups[groupIndex].push(med);
        }

        return activeMeditationGroups;
    }

    changeActiveList = index => {
        DiscoverList.forEach((item, ind) =>{
            item.active = index === ind;
        });

        this.setState({
            discoverList : DiscoverList
        });

       try {
           if(this.flatListRef != null){
               this.flatListRef.current.scrollToIndex({index});
           }

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
            style={styles.discoverContainer}
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
       // console.log("Visible items are", viewableItems);
       // console.log("Changed in this iteration", changed);

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
            <View>
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
            </View>
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
    },
    discoverContainer: {
        padding: windowWidth / 50,
        width: windowWidth,
        flex : 1
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});


export default DiscoverScreen;
