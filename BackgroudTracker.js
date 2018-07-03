import React, { Component } from "react";
import {
  Alert,
  View,
  Button,
  Text,
  StyleSheet,
  TouchableHighlight,
  NativeModules,
  LayoutAnimation
} from "react-native";
import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import ToggleSwitch from "toggle-switch-react-native";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class BgTracking extends Component {
  constructor() {
    super();
    this.state = {
      rideTimerSeconds: "00",
      rideTimerMinutes: "00",
      rideTimerHours: "00",
      headerMessage: "No GPS signal",
      isOnBlueToggleSwitch: false,

      buttonStatus: "recordingButton",

      startButtonColor: "#E0ECF1",
      startButtonWidth: 310,
      startButtonHeight: 310,
      startButtonBorderRadius: 310 / 2,
      startButtonBorderColor: "#79CDBE",
      startButtonBorderWidth: 80,

      stopButtonColor: "red",
      stopButtonWidth: 155,
      stopButtonHeight: 155,
      stopButtonBorderRadius: 30,
      stopButtonBorderColor: "#79CDBE",
      stopButtonBorderWidth: 33
    };
  }

  onToggle(isOn) {
    alert("Changed to " + isOn);
  }

  startTrack = () => {
    //Alert.alert("Tracking Started!");
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: "Background tracking",
      notificationText: "enabled",
      debug: true,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: "http://192.168.81.15:3000/location",
      httpHeaders: {
        "X-FOO": "bar"
      },
      // customize post properties
      postTemplate: {
        lat: "@latitude",
        lon: "@longitude"
      }
    });

    BackgroundGeolocation.on("location", location => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      console.log(location);
      BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        //console.log("");
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on("stationary", stationaryLocation => {
      // handle stationary locations here
      console.log("haha", stationaryLocation);
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on("error", error => {
      console.log("[ERROR] BackgroundGeolocation error:", error);
    });

    BackgroundGeolocation.on("start", () => {
      console.log("[INFO] BackgroundGeolocation service has been stasrted");
    });

    BackgroundGeolocation.on("stop", () => {
      console.log("[INFO] BackgroundGeolocation service has been stopped");
    });

    BackgroundGeolocation.on("authorization", status => {
      console.log(
        "[INFO] BackgroundGeolocation authorization status: " + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              "App requires location tracking permission",
              "Would you like to open app settings?",
              [
                {
                  text: "Yes",
                  onPress: () => BackgroundGeolocation.showAppSettings()
                },
                {
                  text: "No",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel"
                }
              ]
            ),
          1000
        );
      }
    });

    BackgroundGeolocation.on("background", () => {
      console.log("[INFO] App is in background");
      console.log(location);
    });

    BackgroundGeolocation.on("foreground", () => {
      console.log("[INFO] App is in foreground");
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log(
        "[INFO] BackgroundGeolocation service is running",
        status.isRunning
      );
      console.log(
        "[INFO] BackgroundGeolocation services enabled",
        status.locationServicesEnabled
      );
      console.log(
        "[INFO] BackgroundGeolocation auth status: " + status.authorization
      );
    });

    // you can also just start without checking for status
    BackgroundGeolocation.start();
    //BackgroundGeolocation.background();
  };

  stopTrack = () => {
    // unregister all event listeners
    BackgroundGeolocation.stop();
    BackgroundGeolocation.events.forEach(event =>
      BackgroundGeolocation.removeAllListeners(event)
    );
    Alert.alert("Tracking stopped!");
  };

  startTrackingFunction() {
    this.startTrack();
    // Animate the update
    LayoutAnimation.spring();
    this.setState({
      buttonStatus: "stopButton",
      startButtonBorderRadius: this.state.stopButtonBorderRadius,
      startButtonHeight: this.state.stopButtonHeight,
      startButtonWidth: this.state.stopButtonWidth,
      startButtonBorderWidth: this.state.stopButtonBorderWidth
      /*w: this.state.w + 15,
      h: this.state.h + 15*/
    });
  }

  stopTrackingFunciton() {
    this.stopTrack();
    LayoutAnimation.spring();
    this.setState({
      buttonStatus: "recordingButton",
      startButtonColor: "green"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.rideTimerStyle}>
            {this.state.rideTimerHours +
              ":" +
              this.state.rideTimerMinutes +
              ":" +
              this.state.rideTimerSeconds}{" "}
          </Text>
        </View>
        <View /*style={{ backgroundColor: "red" }}*/>
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
            onPress={this.startTrackingFunction.bind(this)}
          >
            <Text style={styles.startRecText}>REC</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={this.stopTrackingFunciton.bind(this)}>
            <Text>STOP</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#464b64"
  },
  rideTimerStyle: {
    textAlign: "center",
    fontSize: 76,
    fontFamily: "Roboto",
    color: "#A2ABB8",
    margin: 40
  },
  headerTextStyle: {
    textAlign: "center",
    fontSize: 12,
    margin: 5,
    color: "white"
  },
  startRecText: {
    alignSelf: "center",
    textAlign: "center",
    color: "#79CDBE",
    fontSize: 43,
    justifyContent: "center"
  },
  startButtonStyle: {},
  stopButtonStyle: {}
});
export default BgTracking;
