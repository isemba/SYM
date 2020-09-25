import {Text, View, StyleSheet, ImageBackground} from "react-native";
import React from "react";
import {Color} from "../utils/Colors";
import PropTypes from 'prop-types';
import {Ionicons} from "@expo/vector-icons";

export default function Card (props){
    const {lock, color, title, desc} = props;
    const size = props.size ? props.size : 1;

    return(
        <View sytle ={{flex: size}}>
            <ImageBackground source={require('../assets/images/SampleImage.jpg')} />
            <View sytle={styles.lock}>
                {lock ? <Lock /> :null}
            </View>

            <View style={[styles.bottom, {backgroundColor: color}]}>
                <Text style={styles.titleStyle}>
                    {title}
                </Text>
                <Text style={styles.descStyle}>
                    {desc}
                </Text>
            </View>



        </View>
    )
}
function Lock(){
    return(
        <View style={{flex:1}}>
            <Ionicons
                name={'ios-lock'}
                size={12}
                color={'#000'}
                style={{ padding: 10, fontSize:20 }}
            />
        </View>
    )
}
Card.propTypes={
    lock: PropTypes.bool,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    size: PropTypes.number

}
const styles = StyleSheet.create({
    bottom: {

    },
    descStyle:{

    },
    titleStyle:{

    },
    lock:{

    }

})