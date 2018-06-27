import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class GeolocationExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    startTracking = () => {
         this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 1},
        );
    }

    stopTracking = () => {
        navigator.geolocation.clearWatch(this.watchId);
        navigator.geolocation.stopObserving();
    }

    render() {
        return (
            <View>
                <Button title="Start tracking" onPress={this.startTracking}/>
                <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Latitude: {this.state.latitude}</Text>
                    <Text>Longitude: {this.state.longitude}</Text>
                    {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                </View>
                <Button title="Stop tracking" onPress={this.stopTracking} color="red"/>
            </View>
        );
    }
}

export default GeolocationExample;