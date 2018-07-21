import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import realm from "./realm";
import {calcDistance} from './calcDistance'
import {calcTimeTaken} from './calcTimeTaken'

function pushToDatabase(lat, lon, time) {
  const totaltrips = realm.objects("Trips").length;
  //const totalDistance = realm.objects("General").totalDistance;
  //const avgSpeed = realm.objects("General").avgSpeed;
  
  //console.log('db',avgSpeed)
  
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
    
    const update = realm.create("General", {
      fixed: 1,
      totalDistance: 1,
      avgSpeed: 1,
    },true)
    //update.totalDistance = totalDistance + newTrip.distance;
    //update.avgSpeed = avgSpeed + newTrip.avgSpeed;
  });
}

export const stopTrack = (lat, lon, time) => {
  pushToDatabase(lat, lon, time);

  BackgroundGeolocation.stop();
  BackgroundGeolocation.events.forEach(event =>
    BackgroundGeolocation.removeAllListeners(event)
  );
};
