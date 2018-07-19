import React, { Component } from "react";
import {View, Image, Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

class GifComponent extends Component {
  render() {
    return (
      <View>
        <Image
          style={{ width: width * 1.15, height: width*0.6, marginBottom: 60 }}
          source={require('../../../assets/BikeGif/BikeGif.gif')}
        />
      </View>
    );
  }
}

export default GifComponent;