import {Text, View, Dimensions, StyleSheet} from "react-native";
import React from "react";
import Card from "../Card";
import ProfileCard from "../ProfileCard";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProfileScreen() {
    return (
        <View style={styles.container}>
            <ProfileCard />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#280d52'

    }
});
export default ProfileScreen;
