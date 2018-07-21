import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import realm from "./realm";
import {calcDistance} from './calcDistance'
import {calcTimeTaken} from './calcTimeTaken'

function pushToDatabase(lat, lon, time) {
  const totaltrips = realm.objects("Trips").length;
  const totalDistance = realm.objects("General")[0].totalDistance;
  const avgSpeed = realm.objects("General")[0].avgSpeed;

  realm.write(() => {
    const newTrip = realm.create("Trips", {
      tripID: totaltrips + 1,
      lat: lat,
      lon: lon,
      timestamp: time,
      distance: 0,
      timetaken: 0,
      avgSpeed:0
    });
    
    newTrip.distance += calcDistance(newTrip);
    newTrip.timetaken += calcTimeTaken(newTrip);
    newTrip.avgSpeed += (newTrip.distance/(newTrip.timetaken/60))

    update = realm.objects("General")[0];
    update.totalDistance += newTrip.distance;
    update.avgSpeed += newTrip.avgSpeed;
  });
}

export const stopTrack = (lat, lon, time) => {
  pushToDatabase(lat, lon, time);

  BackgroundGeolocation.stop();
  BackgroundGeolocation.events.forEach(event =>
    BackgroundGeolocation.removeAllListeners(event)
  );
};
