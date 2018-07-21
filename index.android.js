import React, { Component } from 'react';
import { Alert, View, Button, Text, StyleSheet } from 'react-native';
import realm from './src/utilities/realm'

class Database extends Component {
  constructor(props) {
    super(props);
  }

  gottheLocation() {
    const totaltrips = realm.objects('Trips').length
    
    realm.write(() => {
      realm.create('Trips',
      {
            tripID: totaltrips + 1,
            lat: this.props.geoStates.lat,
            lon: this.props.geoStates.lon,
            timestamp: this.props.geoStates.timestamp,
      }   
        );
    });
}

  componentDidMount() {
    console.log('Component Did Mount');
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