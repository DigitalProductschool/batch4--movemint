import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

class CommunityView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textAlignment}>
                    <View>
                        <Text style={styles.amountTextStyle}>154</Text>
                        <Text style={styles.descriptionTextStyle}>Mitglieder</Text>
                    </View>
                    <View >
                        <Text style={styles.amountTextStyle}>3821</Text>
                        <Text style={styles.descriptionTextStyle}>Community Km</Text>
                    </View>
                    <View>
                        <Text style={styles.amountTextStyle}>31</Text>
                        <Text style={styles.descriptionTextStyle}>Neue Fahrradwege</Text>
                    </View>
                    <View>
                        <Text style={styles.amountTextStyle}>266</Text>
                        <Text style={styles.descriptionTextStyle}>Gelöste Probleme</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: height * 0.8,
        backgroundColor: "#424a63",
        borderWidth: 7,
        borderRadius: 20,
        borderColor: "#A2ABB8",
        marginTop: 15,
    },
    textAlignment: {
        //flex: 1,
        justifyContent: "space-between",
        alignItems: "center"
    },
    amountTextStyle: {
        alignSelf: "center",
        textAlign: "center",
        color: "#79CDBE",
        fontSize: 65,
    },
    descriptionTextStyle: {
        alignSelf: "center",
        textAlign: "center",
        color: "#A2ABB8",
        fontSize: 26,
    }
});

export default CommunityView;