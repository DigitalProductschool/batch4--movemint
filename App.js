import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import GifComponent from "./src/components/GifComponent/GifComponent";
import StartStopButton from "./src/components/StartStopButton/StartStopButton";
import KilometerDisplay from "./src/components/KilometerDisplay/KilometerDisplay";

import CommunityButton from "./src/components/footer/CommunityButton/CommunityButton";
import HistoryButton from "./src/components/footer/HistoryButton/HistoryButton";

import FooterCombined from "./src/components/footer/FooterCombined/FooterCombined";

import CommunityView from "./src/components/footer/CommunityView/CommunityView";
import HistoryView from "./src/components/footer/HistoryView/HistoryView";

import IntroSlider from "./src/components/IntroSlider/IntroSlider";

import DatabaseManager from "./index.android";

import AppIntro from "react-native-app-intro";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import renderIf from "./renderIf";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenState: "Intro",
      renderDatabase: false,
      geoStates: {
        lon: [],
        lat: [],
        timestamp: []
      }
    };

    this.changeDatabaseFalse = this.changeDatabaseFalse.bind(this);
    this.changeDatabaseTrue = this.changeDatabaseTrue.bind(this);
    this.updateValues = this.updateValues.bind(this);
    this.changeStateScreenState = this.changeStateScreenState.bind(this);
    this.changeStateScreenStateCommunity = this.changeStateScreenStateCommunity.bind(
      this
    );
    this.changeStateScreenStateHistory = this.changeStateScreenStateHistory.bind(
      this
    );
    this.changeStateToHome = this.changeStateToHome.bind(this);
  }
  updateValues(lat, lon, timestamp) {
    this.setState({
      geoStates: {
        lon: lat,
        lat: lon,
        timestamp: timestamp
      }
    });
  }
  changeDatabaseTrue() {
    //let newStatus = this.state.renderDatabase === true ? false : true;
    //console.log('Database changed to true');
    this.setState({
      renderDatabase: true
    });
  }

  changeDatabaseFalse() {
    //let newStatus = this.state.renderDatabase === true ? false : true;
    //console.log('Database changed to false');
    this.setState({
      renderDatabase: false
    });
  }

  changeStateScreenState() {
    let futureState =
      this.state.screenState === "Tracking" ? "Home" : "Tracking";
    this.setState({
      screenState: futureState
    });
  }

  changeStateScreenStateCommunity() {
    let futureState =
      this.state.screenState === "Home" ||
      this.state.screenState === "HistoryView"
        ? "CommunityView"
        : "Home";
    this.setState({
      screenState: futureState
    });
  }

  changeStateScreenStateHistory() {
    let futureState =
      this.state.screenState === "Home" ||
      this.state.screenState === "CommunityView"
        ? "HistoryView"
        : "Home";
    this.setState({
      screenState: futureState
    });
  }

  changeStateToHome() {
    this.setState({
      screenState: "Home"
    });
  }

  checkOneState(firstState) {
    return this.state.screenState === firstState ? true : false;
  }

  checkTwoStates(firstState, secondState) {
    return this.state.screenState === firstState ||
      this.state.screenState === secondState
      ? true
      : false;
  }

  checkThreeStates(firstState, secondState, thirdState) {
    return this.state.screenState === firstState ||
      this.state.screenState === secondState ||
      this.state.screenState === thirdState
      ? true
      : false;
  }

  render() {
    console.log("************************************");
    console.log(
      "Current Screen State when rendered: " + this.state.screenState
    );
    return (
      <View style={{ flex: 1, flexWrap: "wrap" }}>
        {renderIf(this.checkOneState("Intro"))(
          <IntroSlider changeStateToHome={this.changeStateToHome} />
        )}
        <View style={styles.container}>
          {renderIf(this.checkTwoStates("Home", "Tracking"))(
            <KilometerDisplay screenState={this.state.screenState} />
          )}

          {renderIf(this.checkOneState("CommunityView"))(
            <CommunityView
              screenState={this.state.screenState}
              style={{ flex: 1 }}
            />
          )}

          {renderIf(this.checkOneState("HistoryView"))(<HistoryView />)}

          {renderIf(this.checkOneState("Tracking"))(<GifComponent />)}
          {renderIf(this.checkTwoStates("Home", "Tracking"))(
            <StartStopButton
              changeStateScreenState={this.changeStateScreenState}
              currentScreenState={this.state.screenState}
              updateValues={this.updateValues}
              changeDatabaseFalse={this.changeDatabaseFalse}
              changeDatabaseTrue={this.changeDatabaseTrue}
              style={{ position: "absolute", zIndex: -1 }}
            />
          )}
        </View>
        {renderIf(
          this.checkThreeStates("Home", "CommunityView", "HistoryView")
        )(
          <View style={styles.bottomButtonView}>
            <CommunityButton
              changeStateScreenStateCommunity={
                this.changeStateScreenStateCommunity
              }
              style={{ paddingTop: 50 }}
              currentScreenState={this.state.screenState}
            />
            {renderIf(this.state.screenState !== "Home")(
              <StartStopButton
                changeStateScreenState={this.changeStateScreenState}
                updateValues={this.updateValues}
                currentScreenState={this.state.screenState}
                changeDatabaseFalse={this.changeDatabaseFalse}
                changeDatabaseTrue={this.changeDatabaseTrue}
                style={{ position: "absolute", zIndex: -1 }}
              />
            )}
            <HistoryButton
              changeStateScreenStateHistory={this.changeStateScreenStateHistory}
              currentScreenState={this.state.screenState}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#424a63"
    //position: "absolute"
  },
  bottomButtonView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#424a63",
    justifyContent: "space-between",
    overflow: "visible",
    zIndex: -1
    //position: "absolute"
  },
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

export default App;

/*
<View style={styles.bottomButtonView}>
            <CommunityButton
              changeStateScreenStateCommunity={
                this.changeStateScreenStateCommunity
              }
              style={{ paddingTop: 50 }}
              currentScreenState={this.state.screenState}
            />
            {renderIf(this.state.screenState !== "Home")(
              <StartStopButton
                changeStateScreenState={this.changeStateScreenState}
                updateValues={this.updateValues}
                currentScreenState={this.state.screenState}
                changeDatabaseFalse={this.changeDatabaseFalse}
                changeDatabaseTrue={this.changeDatabaseTrue}
                style={{ position: "absolute", zIndex: -1 }}
              />
            )}
            <HistoryButton
              changeStateScreenStateHistory={this.changeStateScreenStateHistory}
              currentScreenState={this.state.screenState}
            />
          </View>
 */
