import React, { Component } from "react";
import { View, Text } from "react-native";
import { stopTimerFunction } from "../../utilities/stopTimerFunction";
import { startTimerFunction } from "../../utilities/startTimerFunction";

class TimerComponent extends Component {
  constructor() {
    super();
    this.state = {
      rideTimer: "00:00:00",
      timerTextAlignConst: "center",
      timerFontFamilyConst: "Roboto",
      timerColorConst: "#A2ABB8",
      timerFontSize: 76,
      timerMargin: 40,

      backgroundTimerActivated: false,
      backgroundTimerCurrentlyGoing: false,
      rideDurationSeconds: 0
    };
  }

  changeBackgroundTimerActivated() {
      this.setState({
          backgroundTimerActivated: !this.state.backgroundTimerActivated
      })
  }

  startStopTimerFunction() {
      console.log("COMPONENT DID MOUNT REACHED");
      console.log(this.state.backgroundTimerActivated)
      console.log(this.state.backgroundTimerCurrentlyGoing)
    if (
      this.state.backgroundTimerActivated &&
      !this.state.backgroundTimerCurrentlyGoing
    ) {
      startTimerFunction();
    } else if (!this.state.backgroundTimerActivated) {
      stopTimerFunction();
    }
  }

  render() {
    return (
      <View>
        <Text
          style={{
            textAlign: this.state.timerTextAlignConst,
            fontFamily: this.state.timerFontFamilyConst,
            color: this.state.timerColorConst,
            fontSize: this.state.timerFontSize,
            margin: this.state.timerMargin
          }}
        >
          {this.state.rideTimer}
        </Text>
      </View>
    );
  }
}

export default TimerComponent;
