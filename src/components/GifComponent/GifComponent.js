import React, { Component } from "react";
import { View, Image } from "react-native";

class GifComponent extends Component {
  render() {
    return (
      <View>
        <Image
          style={{ width: 335, height: 384, marginBottom: 20 }}
          source={{
            uri:
              "http://i717.photobucket.com/albums/ww173/prestonjjrtr/Funny/CatBicycle.gif"
          }}
        />
      </View>
    );
  }
}

export default GifComponent;
