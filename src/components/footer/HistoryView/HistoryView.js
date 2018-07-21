import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, FlatList } from "react-native";
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Thumbnail,
    Left,
    Body,
    Right,
    Button
} from "native-base";
import realm from '../../../utilities/realm'

const { width, height } = Dimensions.get("window");

class HistoryView extends Component {
    renderItem({ item, index }) {
        return <Text style={style.row}>{item}</Text>;
    }
    
    trips = realm.objects('Trips');
    general = realm.objects('General');

    // getTotalDistance = (trips) => {
    //     var distance = 0;
    //     for(let trip of trips)
    //     {
    //         distance+=trip.distance;
    //     }
    //     return distance;
    // }

    // getAvgSpeed = (trips) => {
    //     var dist = this.getTotalDistance(trips);
    //     var time=0;
    //     for(let trip of trips)
    //     {
    //         time+=trip.timetaken;
    //     }
    //     return (dist*1.0)/(time/60);
    // }

    items = [
        "Simon Mignolet",
        "Nathaniel Clyne",
        "Dejan Lovren",
        "Mama Sakho",
        "Emre Can",
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
                <View style={{ flex: 7 }}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.amountTextStyle}>{this.general.totalDistance.toFixed(2)}</Text>
                            <Text style={styles.descriptionTextStyle}>
                                km total
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.amountTextStyle}>{this.trips.length}</Text>
                            <Text style={styles.descriptionTextStyle}>
                                trips
                            </Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.amountTextStyle}>{this.general.avgSpeed.toFixed(2)}</Text>
                            <Text style={styles.descriptionTextStyle}>
                                avg km/h
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.amountTextStyle}>1</Text>
                            <Text style={styles.descriptionTextStyle}>
                                kg CO2 saved
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.listView}>
                    <List
                        dataArray={this.items}
                        renderRow={item => (
                            <ListItem avatar>
                                <Left>
                                    <Text style={{color: "#79CDBE", fontSize: 14}}>#1</Text>
                                </Left>
                                <Body>
                                    <Text style={{ color: "#79CDBE" }}>
                                        June 27, 2018 at 17:29
                                    </Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginRight: 10
                                        }}
                                    >
                                        <View>
                                            <Text style={styles.listViewInfoHeader}>Entfernung</Text>
                                            <Text style={styles.listViewAmount}>6.4km</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.listViewInfoHeader}>Zeit</Text>
                                            <Text style={styles.listViewAmount}>15:24</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.listViewInfoHeader}>avg km/h</Text>
                                            <Text style={styles.listViewAmount}>12.7</Text>
                                        </View>
                                    </View>
                                </Body>
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
        alignItems: "center"
    },
    listView: {
        flex: 9,
    },
    listViewInfoHeader: {
        color: "#A2ABB8",
        fontSize: 14,
        textAlign: "center"
    },
    listViewAmount: {
        color: "#79CDBE",
        fontSize: 20,
        textAlign: "center"
    }
});

export default HistoryView;