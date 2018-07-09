import React, { Component } from 'react';
import { Alert, View, Button, Text, StyleSheet } from 'react-native';
import realm from '../../utilities/realm'

class Database extends Component {
  constructor(props) {
    super(props);
  }

  gottheLocation() {
    realm.write(() => {
      realm.create('Users',
        {
          userName: 'Parth',
          userID: 1,
          totalDistance: 10,
          totalTrips: 1,
          trips: [{
            tripID: 2,
            lat: this.props.geoStates.lat,
            lon: this.props.geoStates.lon,
            timestamp: this.props.geoStates.timestamp
          }],
        });
    });
    let allusers = realm.objects('Users');
    console.log('users');
    for (let p of allusers) {
      console.log('yoyo', JSON.stringify(p.trips));
    }
  }

  deleteAllUsers() {
    realm.write(() => {
      let allusers = realm.objects('Users');
      console.log('Deleting all users.');
      realm.delete(allusers);
    })
  }
  componentDidMount() {
    console.log('Component Did Mount')
    if (realm.objects('Users').length > 3) { this.deleteAllUsers(); }

    this.gottheLocation();
  }
  render() {
    return (
      <View>
        <Text>
        </Text>
      </View>
    )
  }
}
export default Database;