import BackgroundGeolocation from "react-native-mauron85-background-geolocation";

const Realm = require('realm')

const USERNAME = "Robinbux"
const PASSWORD = "1234"
const SERVER = "movemintserver.de1a.cloud.realm.io"

const GeolocationSchema = {
  name: 'GeoLocation',
  primaryKey: 'tripID',
  properties: {
    tripID: { type: 'int', optional: false },
    longitude: { type: 'string', optional: false },
    latitude: { type: 'string', optional: false },
    timeStamp: { type: 'string', optional: false}
  }
}

function pushToDatabase(location) {
  console.log("Push to Database reached!");
  Realm.Sync.User.login(`https://${SERVER}`, USERNAME, PASSWORD)
    .then(user => {
      Realm.open({
        sync: {
          url: `realms://${SERVER}/~/tickers`,
          user: user
        },
        schema: [GeolocationSchema],
      })
        .then(realm => {
          let geoResults = realm.objects('GeoLocation')
          // Add some data to the tickers Realms

          realm.write(() => {

            realm.create('GeoLocation', {
              tripID: Math.floor(Math.random() * 1000) + 1,
              longitude: location.longitude.toString(),
              latitude: location.latitude.toString(),
              timeStamp: location.time.toString(),
            }, true)

          })


          geoResults.addListener((objects, changes) => {
            changes.modifications.forEach((index) => {
              const geoLocation = objects[index];
              console.log(`GeoLocation ${geoLocation.tripID} - ${geoLocation.longitude} - ${geoLocation.latitude} - ${geoLocation.timeStamp}`)
            });
          })
        })
    }).catch(error => {
    console.log("AUTH ERROR")
  })
  console.log("Push To Databased finished!")
}

export const startTrack = (lat, lon, timestamp, updateGeoData) => {
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

    console.log("Location incoming!")
    console.log(location);
    console.log("That was it!")
    console.log("PUSH TO DATABASE: ")
    updateGeoData(location.latitude, location.longitude, location.time)
    pushToDatabase(location);
    lon.push(location.longitude.toString());
    lat.push(location.latitude.toString());
    timestamp.push(location.time.toString());
   
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