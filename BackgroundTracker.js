import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import GifComponent from "./src/components/GifComponent/GifComponent";
import StartStopButton from "./src/components/StartStopButton/StartStopButton";
import KilometerDisplay from "./src/components/KilometerDisplay/KilometerDisplay";
import DatabaseManager from './index.android'

import renderIf from "./renderIf";

class BackgroundTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenState: "Home",
            renderDatabase : false,
        };
        this.changeStateScreenState = this.changeStateScreenState.bind(this);
        this.changeDatabaseFalse = this.changeDatabaseFalse.bind(this);
        this.changeDatabaseTrue = this.changeDatabaseTrue.bind(this);
    }

    geoStates = {
        lon : [],
        lat : [],
        timestamp : []
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
        let futureState = this.state.screenState === "Home" ? "Tracking" : "Home";
        this.setState({
            screenState: futureState
        });
    }

    render() {
        console.log("Current Screen State when rendered: " + this.state.screenState )
        return (
            <View style={styles.container}>
                <KilometerDisplay screenState={this.state.screenState} />
                {renderIf(this.state.screenState == "Tracking")(
                    <GifComponent />
                )}
                <StartStopButton 
                    changeStateScreenState={this.changeStateScreenState} 
                    geoStates={this.geoStates}
                    changeDatabaseFalse={this.changeDatabaseFalse}
                    changeDatabaseTrue={this.changeDatabaseTrue}
                    />
                {renderIf(this.state.renderDatabase)(
                    <DatabaseManager 
                    geoStates={this.geoStates} 
                    screenState={this.state.screenState}
                    />

                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#464b64"
    }
});

export default BackgroundTracker;

