import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

class CommunityView extends Component {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: height* 0.6,
        backgroundColor: "red",
        marginTop: 15
    }
});

export default CommunityView;
