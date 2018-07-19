import React, { Component } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    LayoutAnimation,
    NativeModules, Dimensions
} from "react-native";
import { startTrack } from "../../utilities/startTrack";
import { stopTrack } from "../../utilities/stopTrack";

const { width, height } = Dimensions.get('window');

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

class StartStopButton extends Component {
    constructor() {
        super();
        this.state = {
            currentButtonText: "rec",
            buttonStatus: "homeButton",

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

    defineStyle() {
        console.log('inside',this.props.currentScreenState);
        if (this.props.currentScreenState === "Home") {
            this.changeStyleToStart();
        } else if (
            this.props.currentScreenState === "CommunityView" ||
            this.props.currentScreenState === "HistoryView"
        ) {
            this.changeStyleToInfo();
        }
        else{
            this.changeStyleToStop();
        }
    }

    changeStyleToStart() {
        LayoutAnimation.spring();
        this.setState({
            currentButtonBorderRadius : this.startButtonProps.startButtonBorderRadius,
            currentButtonHeight : this.startButtonProps.startButtonHeight,
            currentButtonWidth : this.startButtonProps.startButtonWidth,
            currentButtonBorderWidth : this.startButtonProps.startButtonBorderWidth,
            currentButtonBorderColor: this.startButtonProps.startButtonBorderColor,
            currentButtonText: "rec",
        });
    }

    changeStyleToStop() {
        LayoutAnimation.spring();
        this.setState({
            currentButtonBorderRadius : this.stopButtonProps.stopButtonBorderRadius,
            currentButtonHeight : this.stopButtonProps.stopButtonHeight,
            currentButtonWidth : this.stopButtonProps.stopButtonWidth,
            currentButtonBorderWidth : this.stopButtonProps.stopButtonBorderWidth,
            currentButtonBorderColor: this.stopButtonProps.stopButtonBorderColor,
            buttonStatus : "trackingButton",
            currentButtonText: "stop",
        });
    }

    changeStyleToInfo() {
        LayoutAnimation.spring();
        this.setState({
            currentButtonBorderRadius : this.infoButtonProps.infoButtonBorderRadius,
            currentButtonHeight : this.infoButtonProps.infoButtonHeight,
            currentButtonWidth : this.infoButtonProps.infoButtonWidth,
            currentButtonBorderWidth : this.infoButtonProps.infoButtonBorderWidth,
            currentButtonBorderColor: this.infoButtonProps.infoButtonBorderColor
        });
    }

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

    infoButtonProps = {
        infoButtonWidth: width * 0.4,
        infoButtonHeight: 60,
        infoButtonBorderRadius: 15,
        infoButtonBorderColor: "#79CDBE",
        infoButtonBorderWidth: 10
    };

    startTrackingFunction() {
        startTrack(this.lat, this.lon, this.timestamp);
        this.changeStyleToStop();
        this.props.changeStateScreenState();
        this.props.changeDatabaseFalse();
    }

    stopTrackingFunction() {
        stopTrack();
        this.props.updateValues(this.lat, this.lon, this.timestamp);
        this.state.buttonStatus="homeButton";

        this.changeStyleToStart();
        this.props.changeStateScreenState();
        this.props.changeDatabaseTrue();
    }

    componentDidMount(){
        this.defineStyle();
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
                    if (this.state.buttonStatus == "homeButton") {
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