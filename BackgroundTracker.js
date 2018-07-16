import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    Alert
} from "react-native";

import GifComponent from "./src/components/GifComponent/GifComponent";
import StartStopButton from "./src/components/StartStopButton/StartStopButton";
import KilometerDisplay from "./src/components/KilometerDisplay/KilometerDisplay";

import CommunityButton from "./src/components/CommunityButton/CommunityButton";
import HistoryButton from "./src/components/HistoryButton/HistoryButton";

import CommunityView from "./src/components/CommunityView/CommunityView";
import HistoryView from "./src/components/HistoryView/HistoryView";

import DatabaseManager from './index.android'

import AppIntro from "react-native-app-intro";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import renderIf from "./renderIf";

class BackgroundTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenState: "Intro",
            renderDatabase : false,
            geoStates : {
                lon : [],
                lat : [],
                timestamp : []
            }
        };
        this.changeStateScreenState = this.changeStateScreenState.bind(this);
        this.changeDatabaseFalse = this.changeDatabaseFalse.bind(this);
        this.changeDatabaseTrue = this.changeDatabaseTrue.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.changeStateScreenStateCommunity = this.changeStateScreenStateCommunity.bind(this);
        this.changeStateScreenStateHistory = this.changeStateScreenStateHistory.bind(this);
    }
    updateValues(lat, lon, timestamp) {
        this.setState({
            geoStates : {
                lon : lat,
                lat :  lon,
                timestamp : timestamp

            }
        })
    }
    changeDatabaseTrue() {
        //let newStatus = this.state.renderDatabase === true ? false : true;
        //console.log('Database changed to true');
        this.setState({
            renderDatabase : true
        });
    }

    changeDatabaseFalse() {
        //let newStatus = this.state.renderDatabase === true ? false : true;
        //console.log('Database changed to false');
        this.setState({
            renderDatabase : false
        });
    }

    changeStateScreenState() {
        let futureState = this.state.screenState === "Tracking" ? "Home" : "Tracking";
        this.setState({
            screenState: futureState
        });
    }

    changeStateScreenStateCommunity() {
        let futureState =
            this.state.screenState === "Home" ||
            this.state.screenState == "HistoryView"
                ? "CommunityView"
                : "Home";
        this.setState({
            screenState: futureState
        });
    }
    
    changeStateScreenStateHistory() {
        let futureState =
            this.state.screenState === "Home" ||
            this.state.screenState == "CommunityView"
                ? "HistoryView"
                : "Home";
        this.setState({
            screenState: futureState
        });
    }

    checkOneState(firstState) {
                return this.state.screenState === firstState ? true : false;
            }
        
    checkTwoStates(firstState, secondState) {
        return this.state.screenState === firstState ||
            this.state.screenState === secondState
            ? true
            : false;
        }

    checkThreeStates(firstState, secondState, thirdState) {
        return this.state.screenState === firstState ||
            this.state.screenState === secondState ||
            this.state.screenState === thirdState
            ? true
            : false;
    }    

    onSkipBtnHandle = index => {
        Alert.alert("Skip");
        console.log(index);
        this.setState({
            screenState: "Home"
        });
    };
    doneBtnHandle = () => {
        Alert.alert("Done");
        this.setState({
            screenState: "Home"
        });
    };
    nextBtnHandle = index => {
        Alert.alert("Next");
        console.log(index);
    };
    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    };


    render() {
        console.log("************************************")
        console.log("Current Screen State when rendered: " + this.state.screenState )
        return (
            <View style={{ flex: 1, flexWrap: "wrap" }}>
            {renderIf(this.checkOneState("Intro"))(
                    <AppIntro
                        onNextBtnClick={this.nextBtnHandle}
                        onDoneBtnClick={this.doneBtnHandle}
                        onSkipBtnClick={this.onSkipBtnHandle}
                        onSlideChange={this.onSlideChangeHandle}
                    >
                        <View
                            style={[
                                styles.slide,
                                { backgroundColor: "#fa931d" }
                            ]}
                        >
                            <View level={10} style={{ marginBottom: 20 }}>
                                <FontAwesomeIcon
                                    name="map-signs"
                                    size={200}
                                    color={"white"}
                                    backgroundColor="#fa931d"
                                />
                            </View>
                            <View level={0}>
                                <Text style={styles.text}>
                                    Durch deinen Beitrag als Radler verbessert
                                    die Stadt die Radwege und Infrastruktur für
                                    Radler.
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.slide,
                                { backgroundColor: "#a4b602" }
                            ]}
                        >
                            <View level={0} style={{ marginBottom: 20 }}>
                                <FontAwesomeIcon
                                    name="map"
                                    size={200}
                                    color={"white"}
                                    backgroundColor="#a4b602"
                                />
                            </View>
                            <View level={8}>
                                <Text style={styles.text}>
                                    Wir benötigen keine persönlichen
                                    Informationen - nur deine Radrouten.
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.slide,
                                { backgroundColor: "#fa931d" }
                            ]}
                        >
                            <View level={5} style={{ marginBottom: 20 }}>
                                <MaterialIcon
                                    name="bike"
                                    size={200}
                                    color={"white"}
                                    backgroundColor="#fa931d"
                                />
                            </View>
                            <View level={12}>
                                <Text style={styles.text}>
                                    Zeichne deine Routen auf und werde Teil
                                    unserer Radler-Community!
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.slide,
                                { backgroundColor: "#a4b602" }
                            ]}
                        >
                            <View level={10} style={{ marginBottom: 20 }}>
                                <MaterialIcon
                                    name="cellphone"
                                    size={200}
                                    color={"white"}
                                    backgroundColor="#a4b602"
                                />
                            </View>
                            <View level={-5}>
                                <Text style={styles.text}>
                                    Probleme auf deiner Route werden durch
                                    Sensoren in deinem Handy erkannt. Wir teilen
                                    dir mit, wann sie gelöst werden.
                                </Text>
                            </View>
                        </View>
                    </AppIntro>
                )}
                <View style={styles.container}>
                    {renderIf(this.checkTwoStates("Home", "Tracking"))(
                        <KilometerDisplay
                            screenState={this.state.screenState}
                        />
                    )}

                    {renderIf(this.checkOneState("CommunityView"))(
                        <CommunityView
                            screenState={this.state.screenState}
                            style={{ flex: 1 }}
                        />
                    )}
                    
                    {renderIf(this.checkOneState("HistoryView"))(
                        <HistoryView />
                    )}

                    {renderIf(this.checkOneState("Tracking"))(<GifComponent />)}

                    {renderIf(this.state.renderDatabase)(
                    <DatabaseManager 
                    geoStates={this.state.geoStates} 
                    screenState={this.state.screenState}
                    />

                    )}
                    {renderIf(this.checkTwoStates("Home", "Tracking"))(
                    <StartStopButton
                        changeStateScreenState={this.changeStateScreenState}
                        currentScreenState={this.state.screenState}
                        updateValues={this.updateValues}
                        changeDatabaseFalse={this.changeDatabaseFalse}
                        changeDatabaseTrue={this.changeDatabaseTrue}
                        style={{ position: "absolute", zIndex: -1 }}
                    />
                    )}
                </View>
                {renderIf(this.checkThreeStates("Home", "CommunityView", "HistoryView"))(
                    <View style={styles.bottomButtonView}>
                        <CommunityButton
                            changeStateScreenStateCommunity={
                                this.changeStateScreenStateCommunity
                            }
                            style={{ paddingTop: 50 }}
                            currentScreenState={this.state.screenState}
                        />
                        {renderIf(this.state.screenState !== "Home")(
                            <StartStopButton
                            changeStateScreenState={this.changeStateScreenState}
                            updateValues={this.updateValues}
                            currentScreenState={this.state.screenState}
                            changeDatabaseFalse={this.changeDatabaseFalse}
                            changeDatabaseTrue={this.changeDatabaseTrue}
                            style={{ position: "absolute", zIndex: -1 }}
                            />
                        )}
                        <HistoryButton
                            changeStateScreenStateHistory={
                                this.changeStateScreenStateHistory
                            }
                            currentScreenState={this.state.screenState}
                        />
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#424a63"
        //position: "absolute"
    },
    bottomButtonView: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#424a63",
        justifyContent: "space-between",
        overflow: "visible",
        zIndex: -1
        //position: "absolute"
    },
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB",
        padding: 15
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default BackgroundTracker;

