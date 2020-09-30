import React, {Component} from "react";
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Color } from "../../utils/Colors";
import { MusicList } from "../../utils/Data";
import Languages, { getLanguageText } from '../../utils/Language';
import Card from '../Card';
import Title from "../Title";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class MusicScreen extends Component {
    state = {
        musicList: [],
        activeMusicGroups: []
    }


    constructor(props) {
        super(props);
        MusicList[0].active = true;
    }

    componentDidMount(){
        const musics = MusicList[0].musics;
        const activeMusicGroups = this.getMusicGroups(musics);

        this.setState({
            musicList : MusicList,
            activeMusicGroups
        })
    }

    getMusicGroups(musics) {
        const activeMusicGroups = [];
        let groupIndex = -1;
        for(let i = 0; i < musics.length; i++){
            const med = musics[i];

            if(i % 2 === 0){
                groupIndex++;
                activeMusicGroups[groupIndex] = [];
            }

            activeMusicGroups[groupIndex].push(med);
        }

        return activeMusicGroups;
    }

    changeActiveList = index => {
        let musics;
        MusicList.forEach((item, ind) =>{
            if(index === ind){
                item.active = true;
                musics = item.musics;
            }else{
                item.active = false;
            }
        });

        const activeMusicGroups = this.getMusicGroups(musics);

        this.setState({
            musicList : MusicList,
            activeMusicGroups
        });
    };

    render() {
        const { musicList, activeMusicGroups } = this.state;

        return (
            <View>
                <ScrollView
                    style={styles.container}
                    horizontal={true}
                >
                    { musicList.map( (item, index) =>{
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

                <ScrollView style={styles.musicContainer}>
                    {
                        activeMusicGroups.map((group, index) => ( addMusicCards(group, index) ))
                    }

                    <View style={{ height: windowHeight / 10 }} />
                </ScrollView>
            </View>
        )
    }

}

function addMusicCards(group, groupIndex){
    const groupSize = group.length;

    if(groupSize === 1 && groupIndex === 0){
        const card = group[0];
        return (
            getCard(card, 0, 96)
        )
    }

    return (
        <View style={styles.cardContainer} key={"music_card_container_" + groupIndex}>
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
    musicContainer: {
        padding: windowWidth / 50
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});



export default MusicScreen;
