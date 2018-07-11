import React, { Component } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class HistoryButton extends Component {
    constructor(){
        super();
        this.state = {
            buttonColor: "#a2abb8"
        };
    }

    onButtonPress() {
        let futureColor = this.state.buttonColor === "#a2abb8" ? "#79CDBE" : "#a2abb8";
        this.setState({
            buttonColor: futureColor
        });
    }

    render() {
        return(
            <Icon.Button
                name="history"
                size={60}
                color={this.state.buttonColor}
                onPress={() => this.onButtonPress()}
                backgroundColor="#424a63"
                iconStyle={{marginRight: 0}}
            />
        )
    }
}

export default HistoryButton;