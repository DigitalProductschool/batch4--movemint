import React, { Component } from 'react';
import { Alert, View, Button, Text, StyleSheet } from 'react-native';
import realm from './realm'
const Realm = require('realm');


class Database extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  gottheLocation() {
    console.log('yoyo');
      realm.write(() => {
        realm.create('Users', 
        { 
          userName: 'Parth', 
          userID: 1, 
          totalDistance: 10, 
          totalTrips: 1, 
          trips:[{ 
            tripID: 1, 
            latLon: ['45, 45', '46, 46'], 
          }],
        });
        //let allusers = realm.objects('Users');
        //realm.delete(allusers);
      });
      this.setState({ realm });
      let allusers = realm.objects('Users');
        console.log('users')
        for (let p of allusers) {
            console.log(`  ${p.userName}`);
        }
  }
  componentDidMount() {
    console.log('Component Did Mount')
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
        yo
        </Text>
      </View>
    )
  }
}
export default Database;