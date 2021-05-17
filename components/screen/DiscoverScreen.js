import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View, FlatList, ImageBackground, SafeAreaView } from 'react-native';
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
        discoverList : HomeData.VIDEOLIST,
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
        that=this;
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
           //this.flatListRef.current.scrollToIndex({index});
           this.flatListRef.current.scrollToOffset({offset:0, animated:false});


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
    renderStaticScreen(){
        //console.log(this.dList[this.state.activeIndex].meditations)
        var size = this.dList[this.state.activeIndex].meditations.length > 1 ? 47 : 96;
        return(
        // <ScrollView
        //     contentContainerStyle={styles.discoverContainer}
        //     showsVerticalScrollIndicator={false}
        // >
                            
        //     <View style={styles.cardContainer}>
        //     {
        //         this.dList[this.state.activeIndex].meditations.map((card, index)=>( getCard(card, index, size) ))
        //     }
        //     </View>
            

            

        //     <View style={{height: windowHeight / 10}}/>
        // </ScrollView>
        
        <FlatList
            contentContainerStyle={styles.discoverContainer}
            data={this.dList[this.state.activeIndex].meditations}
            renderItem={this.renderItem}
            keyExtractor={item => item.title}
            horizontal={false}
            pagingEnabled={false}
            ref={this.flatListRef}
            scrollEnabled={true}
            numColumns={2}
            initialNumToRender={4}
            initialScrollIndex={0}
            //onViewableItemsChanged={this.onViewableItemsChanged }
        /> 
        )
    }
    renderItem(item){
        /*console.log("renderItem");
        console.log(item);*/
        
        // if(that != null && that.state != null && that.state.discoverList != null){
        //     if(that != undefined && that.state != undefined && that.state.discoverList != undefined){
        //         console.log(that.state.discoverList[that.state.activeIndex].meditations.length)
        //         var size = that.state.discoverList[that.state.activeIndex].meditations.length > 1 ? 47 : 96;
        //     }
        // }
        //var size = 47; 

        return(
            //getCard(item, item.index, size)
            //<View></View>

            <Card
                key={"discover_card_" + item.index}
                lock={false}
                color={"#fff"}
                size={47}
                title={item.item.title}
                desc={""}
                //source={require('../../assets/images/SampleImage.jpg')}
                source={{uri:item.item.image}}
                uri={item.item.url}
                id={item.item.cid}
                style={{marginRight:10}}
            />
        )
    }

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

            <LinearGradient style={{display:"flex", flex:1}} colors={Color.HEADER_GRADIENT}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <SafeAreaView style={{display:"flex", flex:1}}>
            <ImageBackground source={Color.BG_IMAGE} style={styles.image}>
                <HeaderBar title={getLanguageText(Languages.DISCOVER)} />
                <LinearGradient
                style={[styles.container, {height: 60, marginBottom:0, marginTop:-5}]}
                colors={Color.HEADER_GRADIENT}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
            >
            
                <FlatList
                    style={[styles.container, {height: 60, marginBottom:0}]}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={this.headerListRef}
                    data={this.dList}
                    keyExtractor={item => "header_"+ item.title}
                    renderItem={this.renderHeaderItem}
                    contentContainerStyle={{paddingRight:20}}
                />
            </LinearGradient>
                 {/* <FlatList
                    data={this.dList}
                    renderItem={this.renderScreen}
                    keyExtractor={item => item.title}
                    horizontal={true}
                    pagingEnabled={true}
                    ref={this.flatListRef}
                    scrollEnabled={false}
                    //onViewableItemsChanged={this.onViewableItemsChanged }
                />  */}
                {this.renderStaticScreen()}
            </ImageBackground>
            </SafeAreaView>
            </LinearGradient>
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
    const { lock, color, title, desc, image, url, cid } = card;
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
            id={cid}
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
        justifyContent:"flex-start",
        minHeight:windowHeight - 160
    },
    cardContainer: {
        flexDirection: "row",
        alignItems:"flex-start",
        justifyContent: "space-between",
        flexWrap:"wrap"
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "cover"
    }
});


export default DiscoverScreen;
