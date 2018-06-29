import React, { Component } from 'react';
import { Alert, View, Button, Text, StyleSheet } from 'react-native';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

class BgTracking extends Component {

  constructor(){
      super();
      this.state = {
          rideTimerSeconds:"00",
          rideTimerMinutes: "00",
          rideTimerHours: "00",
          headerMessage: "No GPS signal"
      }
  }

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
      <View>
        <View>
          <Text style={styles.rideTimerStyle}>{this.state.rideTimerHours + " : " + this.state.rideTimerMinutes +
                  " : " + this.state.rideTimerSeconds} </Text>
        </View>
        <View style={{backgroundColor: "blue", height: 40, justifyContent: 'center',
alignItems: 'center' }}>
          <Text style={styles.headerTextStyle}>{this.state.headerMessage} </Text>
        </View>
        <View>
          <Button title="Start tracking" onPress={this.startTrack}/>
        </View>
        <View>
          <Button color='red' title="Stop tracking" onPress={this.stopTrack}/>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  rideTimerStyle: {
    textAlign: "center",
    fontSize: 22,
    margin: 5
  },
  headerTextStyle: {
    textAlign: "center",
    fontSize: 12,
    margin: 5,
    color: "white"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default BgTracking;
