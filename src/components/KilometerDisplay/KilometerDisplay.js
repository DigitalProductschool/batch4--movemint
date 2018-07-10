import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    NativeModules,
    LayoutAnimation
} from "react-native";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class KilometerDisplay extends Component {
    constructor() {
        super();
        this.state = {
            totalKilometers: 0,
            currentTripKilometers: 0,

            currentFontSize: 80,

            currentKilometerDisplayState: "Home"
        };
        this.changeStyleToHome = this.changeStyleToHome.bind(this);
        this.changeStyleToTracking = this.changeStyleToTracking.bind(this);
    }

    /*currentTextStyleProps = {
        textAlign: "center",
        fontFamily: "Roboto",
        color: "#A2ABB8",
        fontSize: this.state.currentFontSize
    };*/

    defineStyle() {
        console.log("Entered defineStyle!");
        if (this.props.screenState === "Home") {
            this.changeStyleToHome();
        } else if (this.props.screenState === "Tracking") {
            this.changeStyleToTracking();
        }
    }

    changeStyleToHome() {
        console.log("Entered Change to Home!");
        LayoutAnimation.spring();
        this.setState({
            currentFontSize: 80
        });
    }

    changeStyleToTracking() {
        console.log("Entered Change to Tracking!");
        LayoutAnimation.spring();
        this.setState({
            currentFontSize: 30
        });
    }

    componentDidUpdate(){
        if(this.props.screenState !== this.state.currentKilometerDisplayState){
            this.defineStyle();
            this.setState({
                currentKilometerDisplayState: this.props.screenState
            })
        }
    }

    render() {
        return (
            <View>
                <Text
                    style={{
                        textAlign: "center",
                        fontFamily: "Roboto",
                        color: "#A2ABB8",
                        fontSize: this.state.currentFontSize
                    }}
                >
                    {this.state.currentTripKilometers + " km"}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    styleHome: {
        textAlign: "center",
        fontFamily: "Roboto",
        color: "#A2ABB8",
        fontSize: 80
    },
    styleTracking: {
        textAlign: "center",
        fontFamily: "Roboto",
        color: "#A2ABB8",
        fontSize: 40
    }
});

export default KilometerDisplay;

