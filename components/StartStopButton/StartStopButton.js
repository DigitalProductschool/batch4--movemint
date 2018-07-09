import React, { Component } from "react";
import {
    LayoutAnimation,
    TouchableHighlight,
    Text,
    NativeModules, StyleSheet
} from "react-native";
import { stopTrack } from "../../utilities/stopTrack";
import { startTrack } from "../../utilities/startTrack";
import TimerComponent from "../TimerComponent/TimerComponent"

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class StartStopButton extends Component {
  constructor() {
    super();
    this.state = {
      buttonStatus: "recordingButton",

      startButtonColor: "#E0ECF1",
      startButtonWidth: 310,
      startButtonHeight: 310,
      startButtonBorderRadius: 310 / 2,
      startButtonBorderColor: "#79CDBE",
      startButtonBorderWidth: 80,

      currentButtonText: "rec",

      initialStartButtonWidth: 310,
      initialStartButtonHeight: 310,
      initialStartButtonBorderRadius: 310 / 2,
      initialStartButtonBorderColor: "#79CDBE",
      initialStartButtonBorderWidth: 80,

      stopButtonWidth: 155,
      stopButtonHeight: 155,
      stopButtonBorderRadius: 30,
      stopButtonBorderColor: "#79CDBE",
      stopButtonBorderWidth: 33,

      timerTextAlignConst: "center",
      timerFontFamilyConst: "Roboto",
      timerColorConst: "#A2ABB8",
      timerFontSize: 76,
      timerMargin: 40,

      initialHomeTimerFontSize: 76,
      initialHomeTimerMargin: 40,

      recordingTimerFontSize: 30,
      recordingTimerMargin: 10,

      backgroundTimerActivated: false,
      backgroundTimerCurrentlyGoing: false,

      rideDurationSeconds: 0
    };
  }

  startTimerFunction() {
      new TimerComponent().startStopTimerFunction();
  }

  startTrackingFunction() {
    startTrack();


    // Animate the update
    LayoutAnimation.spring();
    this.setState({
      buttonStatus: "stopButton",
      startButtonBorderRadius: this.state.stopButtonBorderRadius,
      startButtonHeight: this.state.stopButtonHeight,
      startButtonWidth: this.state.stopButtonWidth,
      startButtonBorderWidth: this.state.stopButtonBorderWidth,

      timerFontSize: this.state.recordingTimerFontSize,
      timerMargin: this.state.recordingTimerMargin,

      currentButtonText: "stop",

      backgroundTimerActivated: true
    });
  }

  stopTrackingFunction() {
    stopTrack();

    LayoutAnimation.spring();
    this.setState({
      buttonStatus: "recordingButton",
      startButtonBorderRadius: this.state.initialStartButtonBorderRadius,
      startButtonHeight: this.state.initialStartButtonHeight,
      startButtonWidth: this.state.initialStartButtonWidth,
      startButtonBorderWidth: this.state.initialStartButtonBorderWidth,

      timerFontSize: this.state.initialHomeTimerFontSize,
      timerMargin: this.state.initialHomeTimerMargin,

      currentButtonText: "rec",

      backgroundTimerActivated: false,

      rideDurationSeconds: 0
    });
  }

  render() {
    return (
      <TouchableHighlight
        style={{
          backgroundColor: this.state.startButtonColor,
          borderRadius: this.state.startButtonBorderRadius,
          height: this.state.startButtonHeight,
          width: this.state.startButtonWidth,
          borderWidth: this.state.startButtonBorderWidth,
          borderColor: this.state.startButtonBorderColor,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => {
          if (this.state.buttonStatus == "recordingButton") {
            this.startTrackingFunction();
            this.startTimerFunction();
          } else {
            this.stopTrackingFunction();
          }
        }}
      >
        <Text style={styles.startRecText}>{this.state.currentButtonText}</Text>
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
