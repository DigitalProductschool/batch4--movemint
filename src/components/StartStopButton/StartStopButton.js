import React, { Component } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    LayoutAnimation,
    NativeModules
} from "react-native";
import { startTrack } from "../../utilities/startTrack";
import { stopTrack } from "../../utilities/stopTrack";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class StartStopButton extends Component {
    constructor() {
        super();
        this.state = {
            currentButtonText: "rec",
            buttonStatus: "recordingButton",

            currentButtonColor: "#E0ECF1",
            currentButtonWidth: 310,
            currentButtonHeight: 310,
            currentButtonBorderRadius: 310 / 2,
            currentButtonBorderColor: "#79CDBE",
            currentButtonBorderWidth: 80
        };
    }

    lat=[];
    lon=[];
    timestamp=[];

    startButtonProps = {
        startButtonWidth: 310,
        startButtonHeight: 310,
        startButtonBorderRadius: 310 / 2,
        startButtonBorderColor: "#79CDBE",
        startButtonBorderWidth: 80
    };

    stopButtonProps = {
        stopButtonWidth: 155,
        stopButtonHeight: 155,
        stopButtonBorderRadius: 30,
        stopButtonBorderColor: "#79CDBE",
        stopButtonBorderWidth: 33
    };

    updateLocation( lat, lon, timestamp) {
        //console.log(this.props.geoStates)
        this.lat = lat;
        this.lon = lon;
        this.timestamp = timestamp;
        console.log('in func', this.lat)
    }


    startTrackingFunction() {
        startTrack(this.updateLocation);
    
        LayoutAnimation.spring();
        this.setState({
            buttonStatus: "stopButton",
            currentButtonText: "stop",

            currentButtonBorderRadius: this.stopButtonProps
                .stopButtonBorderRadius,
            currentButtonHeight: this.stopButtonProps.stopButtonHeight,
            currentButtonWidth: this.stopButtonProps.stopButtonWidth,
            currentButtonBorderWidth: this.stopButtonProps.stopButtonBorderWidth
        });
        console.log("Reached start tracking function!");
        
        this.props.changeStateScreenState();
        this.props.changeDatabaseFalse();
    }

    stopTrackingFunction() {
        stopTrack();
        
        console.log('stop ', this.lat)
        this.props.geoStates.lat = this.lat;
        this.props.geoStates.lon = this.lon;
        this.props.geoStates.timestamp = this.timestamp;

        LayoutAnimation.spring();
        this.setState({
            buttonStatus: "recordingButton",
            currentButtonText: "rec",

            currentButtonBorderRadius: this.startButtonProps
                .startButtonBorderRadius,
            currentButtonHeight: this.startButtonProps.startButtonHeight,
            currentButtonWidth: this.startButtonProps.startButtonWidth,
            currentButtonBorderWidth: this.startButtonProps
                .startButtonBorderWidth
        });

        this.props.changeStateScreenState();
        this.props.changeDatabaseTrue();
    } 

    render() {
        return (
            <TouchableHighlight
                style={{
                    backgroundColor: this.state.currentButtonColor,
                    borderRadius: this.state.currentButtonBorderRadius,
                    height: this.state.currentButtonHeight,
                    width: this.state.currentButtonWidth,
                    borderWidth: this.state.currentButtonBorderWidth,
                    borderColor: this.state.currentButtonBorderColor,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => {
                    if (this.state.buttonStatus == "recordingButton") {
                        this.startTrackingFunction();
                    } else {

                        this.stopTrackingFunction();
                    }
                }}
            >
                <Text style={styles.startRecText}>
                    {this.state.currentButtonText}
                </Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    startRecText: {
        alignSelf: "center",
        textAlign: "center",
        color: "#79CDBE",
        fontSize: 43,
        justifyContent: "center"
    }
});

export default StartStopButton;

