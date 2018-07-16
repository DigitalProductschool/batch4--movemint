import React, { Component } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class HistoryButton extends Component {
    constructor(){
        super();
        this.state = {
            buttonColor: "#a2abb8"
        };
    }

    changeColorAndState() {
        let futureColor = this.props.currentScreenState === "HistoryView" ? "#a2abb8" : "#79CDBE"
        this.setState({
            buttonColor: futureColor
        });
        this.props.changeStateScreenStateHistory();
    }

    componentDidUpdate(){
        console.log("Entered Component Did Update History Button")
        console.log("State inside History Button: " + this.props.currentScreenState)
        console.log("Current Button Color: " + this.state.buttonColor)
        if(this.props.currentScreenState !== "HistoryView" && this.state.buttonColor == "#79CDBE"){
            this.setState({
                buttonColor: "#a2abb8"
            });
        }
    }

    render() {
        return(
            <Icon.Button
                name="history"
                size={60}
                color={this.state.buttonColor}
                onPress={() => this.changeColorAndState()}
                backgroundColor="#424a63"
                iconSstyle={{marginRight: 0}}
            />
        )
    }
}

export default HistoryButton;