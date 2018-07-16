import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, FlatList } from "react-native";
import { Container, Header, Content, List, ListItem } from "native-base";

const { width, height } = Dimensions.get("window");

class HistoryView extends Component {
    renderItem({ item, index }) {
        return <Text style={style.row}>{item}</Text>;
    }

    items = [
        "Simon Mignolet",
        "Nathaniel Clyne",
        "Dejan Lovren",
        "Mama Sakho",
        "Emre Can"
    ];

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: "center",
                            color: "#79CDBE"
                        }}
                    >
                        My stats
                    </Text>
                </View>
                <View style={{ flex: 5 }}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.amountTextStyle}>154</Text>
                            <Text style={styles.descriptionTextStyle}>
                                km total
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.amountTextStyle}>13</Text>
                            <Text style={styles.descriptionTextStyle}>
                                trips
                            </Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.amountTextStyle}>14.2</Text>
                            <Text style={styles.descriptionTextStyle}>
                                avg km/h
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.amountTextStyle}>12.8</Text>
                            <Text style={styles.descriptionTextStyle}>
                                kg CO2 saved
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <List
                        dataArray={this.items}
                        renderRow={item => (
                            <ListItem>
                                <Text>{item}</Text>
                            </ListItem>
                        )}
                    />
                </View>

                {/*<View style={styles.listView}>
                </View>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width * 0.9,
        height: height * 0.8,
        backgroundColor: "#424a63",
        borderWidth: 7,
        borderRadius: 20,
        borderColor: "#A2ABB8",
        marginTop: 15
    },
    infoRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    infoItem: {
        flex: 1,
        alignItems: "center"
    },
    amountTextStyle: {
        alignSelf: "center",
        textAlign: "center",
        color: "#79CDBE",
        fontSize: 44
    },
    descriptionTextStyle: {
        alignSelf: "center",
        textAlign: "center",
        color: "#A2ABB8",
        fontSize: 16
    },
    header: {
        flex: 1,
        marginTop: 10,
        marginBottom: 15
    },
    listView: {
        flex: 8,
        backgroundColor: "red"
    }
});

export default HistoryView;