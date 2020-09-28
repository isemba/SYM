import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Color } from "../../utils/Colors";
import { DiscoverList } from "../../utils/Data";
import Languages, { getLanguageText } from '../../utils/Language';
import Card from '../Card';
import Title from "../Title";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class DiscoverScreen extends Component {
    state = {
        discoverList : [],
        activeMeditations : []
    }


    constructor(props){
        super(props);
        DiscoverList[0].active = true;
    }

    componentDidMount(){
        this.setState({
            discoverList : DiscoverList
        })

    }

    changeActiveList = index => {
        DiscoverList.forEach((item, ind) =>{
            item.active = index === ind;
        });

        this.setState({
            discoverList : DiscoverList
        });
    };

    render() {

        return (
            <View>
                <ScrollView
                    style={styles.container}
                    horizontal={true}
                >
                    { this.state.discoverList.map( (item, index) =>{
                        return ( <Title style={styles.titleContainer} title={getLanguageText(item.title)} onPress={() => {
                            this.changeActiveList(index);
                        }} active={item.active} key={"discoverTitle_" + index} />)
                    }) }
    
                </ScrollView>
    
                <View style={styles.discoverContainer}>
                    <View style={styles.cardContainer}>
                         <Card lock={false} color={Color.MENU} title={getLanguageText(Languages.POPULAR)} desc={getLanguageText(Languages.DISCOVER)} source={require('../../assets/images/SampleImage.jpg')} />  
                    </View>                
                </View>
            </View>
        )
    }

}



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: windowWidth / 50
    },
    titleContainer: {
        flexDirection: "row",
    },
    discoverContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: windowWidth
    },
    cardContainer: {
        margin: windowWidth * 3 / 100
    }
});


export default DiscoverScreen;
