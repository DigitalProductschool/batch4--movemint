import React, { Component } from "react";

import Icon from "react-native-vector-icons/FontAwesome";

class CommunityButton extends Component {
    constructor(){
        super();
        this.state = {
            buttonColor: "#a2abb8"
        };
    }

    changeColorAndState() {
        let futureColor = this.props.currentScreenState === "CommunityView" ? "#a2abb8" : "#79CDBE"
        this.setState({
            buttonColor: futureColor
        });
        this.props.changeStateScreenStateCommunity();
    }

    componentDidUpdate(){
        console.log("Entered Component Did Update Community Button")
        if(this.props.currentScreenState !== "CommunityView" && this.state.buttonColor == "#79CDBE"){
            this.setState({
                buttonColor: "#a2abb8"
            });
        }
    }

    render() {
        return(
            <Icon.Button
                name="group"
                size={45}
                color= {this.state.buttonColor}
                onPress={() => this.changeColorAndState()}
                backgroundColor="#424a63"
                iconStyle={{margin: 0}}
            />
        )
    }
}

export default CommunityButton;