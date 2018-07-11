import React, { Component } from "react";

import Icon from "react-native-vector-icons/FontAwesome";

class CommunityButton extends Component {
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
        this.props.changeStateScreenStateCommunity();
    }

    render() {
        return(
            <Icon.Button
                name="group"
                size={45}
                color= {this.state.buttonColor}
                onPress={() => this.onButtonPress()}
                backgroundColor="#424a63"
                iconStyle={{margin: 0}}
            />
        )
    }
}

export default CommunityButton;