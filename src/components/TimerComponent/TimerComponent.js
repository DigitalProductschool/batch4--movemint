import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { msToTime } from "../../utilities/msToTime";
import BackgroundTimer from "react-native-background-timer";

class TimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
    this.tick=this.tick.bind(this)
  }

  intervalId = BackgroundTimer.setInterval(() => {
    // this will be executed every 200 ms
    // even when app is the the background
    this.tick();
  }, 1000);

  // interval;
  //
  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
    console.log("Current Second: " + this.state.seconds);
  }
  //
  // componentDidMount() {
  //   this.interval = setInterval(() => this.tick(), 1000);
  // }

  componentWillUnmount() {
    //clearInterval(this.interval);
    this.state.seconds = 0;
    BackgroundTimer.clearInterval(this.intervalId);
  }

  render() {
    return (
      <View style={{ marginTop: 10, opacity: 0.75 }}>
        <Text style={styles.styleTracking}>{msToTime(this.state.seconds)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  styleTracking: {
    textAlign: "center",
    fontFamily: "Roboto",
    color: "#A2ABB8",
    fontSize: 40
  }
});

export default TimerComponent;
