import React, { Component } from "react";
import { View, Image } from "react-native";

class GifComponent extends Component {
  render() {
    return (
      <View>
        <Image
          style={{ width: 400, height: 240, marginBottom: 20 }}
          source={require('../../../assets/BikeGif/BikeGif.gif')}
        />
      </View>
    );
  }
}

export default GifComponent;
