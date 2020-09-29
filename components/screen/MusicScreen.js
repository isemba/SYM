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
        activemusics: []
    }


    constructor(props) {
        super(props);
        MusicList[0].active = true;
    }

    componentDidMount() {
        this.setState({
            musicList: MusicList
        })

    }

    changeActiveList = index => {
        MusicList.forEach((item, ind) => {
            item.active = index === ind;
        });

        this.setState({
            musicList: MusicList
        });
    };


    render() {
        return (
            <View>
                <ScrollView
                    style={styles.container}
                    horizontal={true}
                >

                    {this.state.musicList.map((item, index) => {
                        return (<Title style={styles.titleContainer} title={getLanguageText(item.title)} onPress={() => {
                            this.changeActiveList(index);
                        }} active={item.active} key={"musicTitle_" + index} />)
                    })}

                </ScrollView>

                <View style={styles.musicContainer}>
                    <View style={styles.cardContainer}>
                         <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />  
                    </View>                
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: windowWidth / 50
    },
    titleContainer: {
        flexDirection: "row",
    },
    musicContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: windowWidth
    },
    cardContainer: {
        margin: windowWidth * 3 / 100
    }
});


export default MusicScreen;
