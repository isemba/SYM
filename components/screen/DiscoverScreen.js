import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Color } from "../../utils/Colors";
import { DiscoverList } from "../../utils/Data";
import Languages, { getLanguageText } from '../../utils/Language';
import Card from '../Card';
import Title from "../Title";
import {TabBarHeight} from "../../utils/DeviceInfo";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class DiscoverScreen extends Component {
    state = {
        discoverList : [],
        activeMeditationGroups: []
    }


    constructor(props){
        super(props);
        DiscoverList[0].active = true;
    }

    componentDidMount(){
        const meditations = DiscoverList[0].meditations;
        const activeMeditationGroups = this.getMeditationGroups(meditations);

        this.setState({
            discoverList : DiscoverList,
            activeMeditationGroups
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
        let meditations;
        DiscoverList.forEach((item, ind) =>{
            if(index === ind){
                item.active = true;
                meditations = item.meditations;
            }else{
                item.active = false;
            }
        });

        const activeMeditationGroups = this.getMeditationGroups(meditations);

        this.setState({
            discoverList : DiscoverList,
            activeMeditationGroups
        });
    };

    render() {
        const { discoverList, activeMeditationGroups } = this.state;

        return (
            <View>
                <ScrollView
                    style={styles.container}
                    horizontal={true}
                >
                    { discoverList.map( (item, index) =>{
                        return (
                            <Title
                                title={getLanguageText(item.title)}
                                active={item.active}
                                key={"discoverTitle_" + index}
                                onPress={() => {
                                    this.changeActiveList(index);
                                }}
                            />)
                    }) }

                </ScrollView>

                <ScrollView style={styles.discoverContainer}>
                    {
                        activeMeditationGroups.map((group, index) => ( addMeditationCards(group, index) ))
                    }

                    <View style={{ height: windowHeight / 10 }} />
                </ScrollView>
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
        padding: windowWidth / 50
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});


export default DiscoverScreen;
