import React, { Component } from 'react';
import { Alert, View, Button, Text, StyleSheet } from 'react-native';

const Realm = require('realm');

const Trips = {
  schema: [{
    name: 'Trips',
    properties: {
      tripID: { type: 'int' },
      latLon: { type: 'string[]' }
    }
  }]
};

const Users = {
  schema: [{
    name: 'Users',
    properties: {
      userName: { type: 'string' },
      userID: { type: 'int' },
      totalDistance: { type: 'int' },
      totalTrips: { type: 'int' },
      trips: { type: 'Trips[]' }
    }
  }]
};

class Database extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  componentWillMount() {
    Realm.open(
      Trips, Users
    ).then(realm => {
      realm.write(() => {
        realm.create('Users', 
        { userID: 1, userName: 'Parth', totalDistance: 10, totalTrips: 1, 
      trips: ['Trips', { tripID: 1, latlon: ['45, 45'] }] });
      });
      this.setState({ realm });
    });
  }

  render() {
    const info = this.state.realm
      ? 'Number of users till now: ' + this.state.realm.objects('Users').length
      : 'Loading...';

    return (
      <View>
        <Text>
          {info}
        </Text>
      </View>
    );
  }
}
export default Database;