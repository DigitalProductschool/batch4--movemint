import React, { Component } from "react";
import { View, Text } from "react-native";

import CommunityButton from "../CommunityButton/CommunityButton"
import FooterStartButton from "../FooterStartStopButton/FooterStartStopButton"
import HistoryButton from "../HistoryButton/HistoryButton"

class FooterCombined extends Component {
  constructor(props) {
    super(props);
  }

  currentScreenState = this.props.currentScreenState;

  render() {
    return (
      <View>
        <CommunityButton currentScreenState={this.currentScreenState}/>
        <FooterStartButton currentScreenState={this.currentScreenState}/>
        <HistoryButton currentScreenState={this.currentScreenState}/>
      </View>
    )
  }
}

export default FooterCombined;
