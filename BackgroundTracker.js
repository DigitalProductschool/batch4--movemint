import React, { Component } from 'react';
import { Alert, View, Button, Text, StyleSheet } from 'react-native';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Database from './index.android.js'

const Realm = require('realm');

class BackgroundTracking extends Component {
  startTrack = () => {
    //Alert.alert("Tracking Started!");
    
      BackgroundGeolocation.configure({
        desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        stationaryRadius: 50,
        distanceFilter: 50,
        notificationTitle: 'Background tracking',
        notificationText: 'enabled',
        debug: true,
        startOnBoot: false,
        stopOnTerminate: false,
        locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
        interval: 10000,
        fastestInterval: 5000,
        activitiesInterval: 10000,
        stopOnStillActivity: false,
        url: 'http://192.168.81.15:3000/location',
        httpHeaders: {
          'X-FOO': 'bar'
        },
        // customize post properties
        postTemplate: {
          lat: '@latitude',
          lon: '@longitude',
        }
      });


      BackgroundGeolocation.on('location', (location) => {
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

      BackgroundGeolocation.on('stationary', (stationaryLocation) => {
        // handle stationary locations here
        console.log('haha',stationaryLocation);
        Actions.sendLocation(stationaryLocation);
      });

      BackgroundGeolocation.on('error', (error) => {
        console.log('[ERROR] BackgroundGeolocation error:', error);
      });

      BackgroundGeolocation.on('start', () => {
        console.log('[INFO] BackgroundGeolocation service has been stasrted');
      });

      BackgroundGeolocation.on('stop', () => {
        console.log('[INFO] BackgroundGeolocation service has been stopped');
      });

      BackgroundGeolocation.on('authorization', (status) => {
        console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
        if (status !== BackgroundGeolocation.AUTHORIZED) {
          // we need to set delay or otherwise alert may not be shown
          setTimeout(() =>
            Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
              { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
              { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
            ]), 1000);
        }
      });

      BackgroundGeolocation.on('background', () => {
        console.log('[INFO] App is in background');
        console.log(location)
      });

      BackgroundGeolocation.on('foreground', () => {
        console.log('[INFO] App is in foreground');
      });

      BackgroundGeolocation.checkStatus(status => {
        console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
        console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
        console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

      });

      // you can also just start without checking for status
    BackgroundGeolocation.start();
    //BackgroundGeolocation.background();

  }

  stopTrack = () => {
    // unregister all event listeners
    BackgroundGeolocation.stop();
    BackgroundGeolocation.events.forEach(event => BackgroundGeolocation.removeAllListeners(event));
    Alert.alert("Tracking stopped!");
  }

  render() {
    return (
      <View style={styles.container}>
      {/* <Database /> */}
        <View style={styles.buttonContainer}>
          <Button title="Start tracking" onPress={this.startTrack}/>
        </View>
        <View style={styles.buttonContainer}>
          <Button color='red' title="Stop tracking" onPress={this.stopTrack}/>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  }
});
export default BackgroundTracking;