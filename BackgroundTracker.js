import React, { Component } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";

import GifComponent from "./src/components/GifComponent/GifComponent";
import StartStopButton from "./src/components/StartStopButton/StartStopButton";
import KilometerDisplay from "./src/components/KilometerDisplay/KilometerDisplay";

import CommunityButton from "./src/components/CommunityButton/CommunityButton";
import HistoryButton from "./src/components/HistoryButton/HistoryButton";

import CommunityView from "./src/components/CommunityView/CommunityView";
import HistoryView from "./src/components/HistoryView/HistoryView";

import DatabaseManager from './index.android'

import renderIf from "./renderIf";

class BackgroundTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenState: "Home",
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

    onSkipBtnHandle = (index) => {
        Alert.alert('Skip');
        console.log(index);
    }
    doneBtnHandle = () => {
        Alert.alert('Done');
    }
    nextBtnHandle = (index) => {
        Alert.alert('Next');
        console.log(index);
    }
    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    }

    render() {
        console.log("************************************")
        console.log("Current Screen State when rendered: " + this.state.screenState )
        return (
            <View style={{ flex: 1, flexWrap: "wrap" }}>
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
                                changeStateScreenState={
                                    this.changeStateScreenState
                                }
                                currentScreenState={this.state.screenState}
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
            }
});

export default BackgroundTracker;

