import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import AppIntro from "react-native-app-intro";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

class IntroSlider extends Component {
  constructor(props) {
    super(props);
  }

  onSkipBtnHandle = index => {
    console.log(index);
    this.props.changeStateToHome()
  };
  doneBtnHandle = () => {
    this.props.changeStateToHome()
  };
  nextBtnHandle = index => {
    console.log(index);
  };
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  };

  render() {
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
      >
        <View style={[styles.slide, { backgroundColor: "#424a63" }]}>
          <View level={10} style={{ marginBottom: 20 }}>
            <FontAwesomeIcon
              name="map-signs"
              size={200}
              color={"white"}
              backgroundColor="#fa931d"
            />
          </View>
          <View level={0}>
            <Text style={styles.text}>
              Durch deinen Beitrag als Radler verbessert die Stadt die Radwege
              und Infrastruktur für Radler.
            </Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: "#424a63" }]}>
          <View level={0} style={{ marginBottom: 20 }}>
            <FontAwesomeIcon
              name="map"
              size={200}
              color={"white"}
              backgroundColor="#a4b602"
            />
          </View>
          <View level={8}>
            <Text style={styles.text}>
              Wir benötigen keine persönlichen Informationen - nur deine
              Radrouten.
            </Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: "#424a63" }]}>
          <View level={5} style={{ marginBottom: 20 }}>
            <MaterialIcon
              name="bike"
              size={200}
              color={"white"}
              backgroundColor="#fa931d"
            />
          </View>
          <View level={12}>
            <Text style={styles.text}>
              Zeichne deine Routen auf und werde Teil unserer Radler-Community!
            </Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: "#424a63" }]}>
          <View level={10} style={{ marginBottom: 20 }}>
            <MaterialIcon
              name="cellphone"
              size={200}
              color={"white"}
              backgroundColor="#a4b602"
            />
          </View>
          <View level={-5}>
            <Text style={styles.text}>
              Probleme auf deiner Route werden durch Sensoren in deinem Handy
              erkannt. Wir teilen dir mit, wann sie gelöst werden.
            </Text>
          </View>
        </View>
      </AppIntro>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
    padding: 15
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default IntroSlider;
