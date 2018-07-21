import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import realm from "./realm";
import {calcDistance} from './calcDistance'
import {calcTimeTaken} from './calcTimeTaken'

function pushToDatabase(lat, lon, time) {
  const totaltrips = realm.objects("Trips").length;

  realm.write(() => {

    const newTrip = realm.create("Trips", {
      tripID: totaltrips + 1,
      lat: lat,
      lon: lon,
      timestamp: time,
      distance: 0,
      timetaken: 0
    });
    newTrip.distance = calcDistance(newTrip);
    newTrip.timetaken = calcTimeTaken(newTrip);
  });
}

export const stopTrack = (lat, lon, time) => {
  pushToDatabase(lat, lon, time);

  BackgroundGeolocation.stop();
  BackgroundGeolocation.events.forEach(event =>
    BackgroundGeolocation.removeAllListeners(event)
  );
};
