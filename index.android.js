import React, { Component } from 'react';
import { Alert, View, Button, Text, StyleSheet } from 'react-native';
import realm from './realm'

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
            tripID: 1,
            lat: ['45', '46'],
            lon: ['48', '46'],
            time: '10101010010'
          }],
        });
    });
    let allusers = realm.objects('Users');
    console.log('users');
    for (let p of allusers) {
      console.log(`  ${p.userName}`);
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
    //{this.gotLocation}

    // const info = this.state.realm
    //   ? 'Number of users till now: ' + this.state.realm.objects('').length
    //   : 'Loading.';

    return (
      <View>
        <Text>

        </Text>
      </View>
    )
  }
}
export default Database;