import BackgroundGeolocation from "react-native-mauron85-background-geolocation";

const Realm = require("realm");

const USERNAME = "Robinbux";
const PASSWORD = "1234";
const SERVER = "movemintserver.de1a.cloud.realm.io";

const GeolocationSchema = {
  name: "GeoLocation",
  primaryKey: "tripID",
  properties: {
    tripID: { type: "int", optional: false },
    longitude: { type: "string", optional: false },
    latitude: { type: "string", optional: false },
    timeStamp: { type: "string", optional: false }
  }
};

function pushToDatabase(location) {
  console.log("Push to Database reached!");
  Realm.Sync.User.login(`https://${SERVER}`, USERNAME, PASSWORD)
    .then(user => {
      Realm.open({
        sync: {
          url: `realms://${SERVER}/~/tickers`,
          user: user
        },
        schema: [GeolocationSchema]
      }).then(realm => {
        let geoResults = realm.objects("GeoLocation");
        // Add some data to the tickers Realms

        realm.write(() => {
          realm.create(
            "GeoLocation",
            {
              tripID: Math.floor(Math.random() * 1000) + 1,
              longitude: location.longitude.toString(),
              latitude: location.latitude.toString(),
              timeStamp: location.time.toString()
            },
            true
          );
        });

        geoResults.addListener((objects, changes) => {
          changes.modifications.forEach(index => {
            const geoLocation = objects[index];
            console.log(
              `GeoLocation ${geoLocation.tripID} - ${geoLocation.longitude} - ${
                geoLocation.latitude
              } - ${geoLocation.timeStamp}`
            );
          });
        });
      });
    })
    .catch(error => {
      console.log("AUTH ERROR");
    });
  console.log("Push To Databased finished!");
}

export const stopTrack = (latitude, longitude, time) => {
  // unregister all event listeners
  location = {
    latitude,
    longitude,
    time
  };

  pushToDatabase(location);
  BackgroundGeolocation.stop();
  BackgroundGeolocation.events.forEach(event =>
    BackgroundGeolocation.removeAllListeners(event)
  );
};
