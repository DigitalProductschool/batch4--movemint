import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import StartStopButton from "../components/StartStopButton/StartStopButton";

export const startTrack = (lat, lon, timestamp) => {
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
    lon.push(location.longitude.toString())
    lat.push(location.latitude.toString())
    timestamp.push(location.time.toString())
    console.log('in funcnew',lon)
    //this.props.updateLocation(lon, location.longitude.toString())
    
    //updateLocation(this.lon, this.lat, this.timestamp);
    
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
    Actions.sendLocation(stationaryLocation);
  });

  BackgroundGeolocation.on("error", error => {
    console.log("[ERROR] BackgroundGeolocation error:", error);
  });

  BackgroundGeolocation.on("start", () => {
    console.log("[INFO] BackgroundGeolocation service has been started");
  });

  BackgroundGeolocation.on("stop", () => {
    console.log("[INFO] BackgroundGeolocation service has been stopped");
  });

  BackgroundGeolocation.on("authorization", status => {
    console.log("[INFO] BackgroundGeolocation authorization status: " + status);
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