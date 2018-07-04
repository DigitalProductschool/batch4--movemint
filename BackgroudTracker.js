import React, { Component } from "react";
import {
  Alert,
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  NativeModules,
  LayoutAnimation
} from "react-native";
import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import renderIf from "./renderIf";
import BackgroundTimer from "react-native-background-timer";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

function msToTime(duration) {
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

class BgTracking extends Component {
  constructor() {
    super();
    this.state = {
      rideTimer: "00:00:00",
      headerMessage: "No GPS signal",
      isOnBlueToggleSwitch: false,

      buttonStatus: "recordingButton",

      startButtonColor: "#E0ECF1",
      startButtonWidth: 310,
      startButtonHeight: 310,
      startButtonBorderRadius: 310 / 2,
      startButtonBorderColor: "#79CDBE",
      startButtonBorderWidth: 80,

      currentButtonText: "rec",

      initialStartButtonColor: "#E0ECF1",
      initialStartButtonWidth: 310,
      initialStartButtonHeight: 310,
      initialStartButtonBorderRadius: 310 / 2,
      initialStartButtonBorderColor: "#79CDBE",
      initialStartButtonBorderWidth: 80,

      stopButtonColor: "red",
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
      startButtonBorderWidth: this.state.stopButtonBorderWidth,

      timerFontSize: this.state.recordingTimerFontSize,
      timerMargin: this.state.recordingTimerMargin,

      currentButtonText: "stop",

      backgroundTimerActivated: true
    });
  }

  stopTrackingFunciton() {
    this.stopTrack();

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

  intervalId;
  currentMilliseconds;
  newTime;

  render() {



    if (this.state.backgroundTimerActivated && !this.state.backgroundTimerCurrentlyGoing) {

        this.setState({
            backgroundTimerCurrentlyGoing: true
        })

      console.log("Timer Started!");
      this.intervalId = BackgroundTimer.setInterval(() => {
        // this will be executed every 200 ms
        // even when app is the the background
        this.state.rideDurationSeconds++;
        console.log("Dauer: " + this.state.rideDurationSeconds);

        this.currentMilliseconds = this.state.rideDurationSeconds * 1000

        this.newTime = msToTime(this.currentMilliseconds)

        this.setState({
            rideTimer: this.newTime
        })

      }, 1000);
    } else if (!this.state.backgroundTimerActivated) {
      console.log("Timer Stopped!");
      BackgroundTimer.clearInterval(this.intervalId);
    }

    return (
      <View style={styles.container}>
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

        {renderIf(this.state.buttonStatus == "stopButton")(
          <View>
            <Image
              style={{ width: 335, height: 384, marginBottom: 20 }}
              source={{
                uri:
                  "http://i717.photobucket.com/albums/ww173/prestonjjrtr/Funny/CatBicycle.gif"
              }}
            />
          </View>
        )}

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
            onPress={() => {
              if (this.state.buttonStatus == "recordingButton") {
                this.startTrackingFunction();
              } else {
                this.stopTrackingFunciton();
              }
            }}
          >
            <Text style={styles.startRecText}>
              {this.state.currentButtonText}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
