import React, { Component } from 'react';
import { Alert, View, Button, Text, StyleSheet } from 'react-native';
//import realm from './src/utilities/realm'
import Realm from 'realm';

var username = 'parth';
var password = 'parth';
var server = 'https://movemintserver.de1a.cloud.realm.io/';

//class Tripsdb extends Realm.Object { }
const Tripsdb = {
    name: 'Trips',
    //primaryKey: 'tripID',
    properties: {
        tripID: { type: 'int' },
        lat: { type: 'list', objectType: 'string' },
        lon: { type: 'list', objectType: 'string' },
        timestamp: { type: 'list', objectType: 'string' }
    }
};

//class Usersdb extends Realm.Object { }
const Usersdb = {
    name: 'Users',
    //primaryKey: 'userID',
    properties: {
        userName: { type: 'string' },
        userID: { type: 'int' },
        totalDistance: { type: 'int' },
        totalTrips: { type: 'int' },
        trips: { type: 'list', objectType: 'Trips' }
    }
};

class Database extends Component {
  constructor(props) {
    super(props);
  }

  gottheLocation() {
    Realm.Sync.User.login(server, username, password, (error, user) => {
      if (!error) {
        console.log(user)
        Realm.open({
          sync: {
            user: user,
            url: 'realms://movemintserver.de1a.cloud.realm.io/~/locationdata',
          },
          schema: [Tripsdb, Usersdb]
        }).then(realm => {
          realm.write(() => {
            realm.create('Users',
              {
                userName: 'Max',
                userID: 1,
                totalDistance: 10,
                totalTrips: 1,
                trips: [{
                  tripID: 2,
                  lat: this.props.geoStates.lat,
                  lon: this.props.geoStates.lon,
                  timestamp: this.props.geoStates.timestamp,
                }],
              });
          });
        });
      }
    });
}

  deleteAllUsers() {
    realm.write(() => {
      let allusers = realm.objects('Users');
      console.log('Limit reached. Deleting all users.');
      realm.delete(allusers);
    })
  }

  componentDidMount() {
    console.log('Component Did Mount');
    //if (realm.objects('Users').length > 6) { this.deleteAllUsers(); }
    
    console.log(this.props.screenState);
    if(this.props.screenState=="Home")
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