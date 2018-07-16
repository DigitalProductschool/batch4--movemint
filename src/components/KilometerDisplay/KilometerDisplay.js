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
            currentTripKilometers: "0.0",
            currentFontSize: 80,
            kmTotalFontSize: 26,
            currentKilometerDisplayState: "Home",

            kmDisplayMarginTop : 40,
            kmTotalMarginBottom: 50
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
        if (this.props.screenState === "Home") {
            this.changeStyleToHome();
        } else if (this.props.screenState === "Tracking") {
            this.changeStyleToTracking();
        }
    }

    changeStyleToHome() {
        LayoutAnimation.spring();
        this.setState({
            currentFontSize: 80,
            kmTotalFontSize: 26,
            kmDisplayMarginTop: 40,
            kmTotalMarginBottom: 50
        });
    }

    changeStyleToTracking() {
        LayoutAnimation.spring();
        this.setState({
            currentFontSize: 60,
            kmTotalFontSize: 20,
            kmDisplayMarginTop: 10,
            kmTotalMarginBottom: 10
        });
    }

    componentDidUpdate() {
        if (
            this.props.screenState !== this.state.currentKilometerDisplayState
        ) {
            this.defineStyle();
            this.setState({
                currentKilometerDisplayState: this.props.screenState
            });
        }
    }

    componentDidMount(){
        this.defineStyle();
    }

    render() {
        return (
            <View>
                <View style={{marginTop: this.state.kmDisplayMarginTop, opacity:0.75}}>
                    <Text
                        style={{
                            textAlign: "center",
                            fontFamily: "Roboto",
                            color: "#79CDBE",
                            fontSize: this.state.currentFontSize
                        }}
                    >
                        {this.state.currentTripKilometers}
                    </Text>
                </View>
                <View style={{ marginBottom: this.state.kmTotalMarginBottom, opacity:0.6 }}>
                    <Text
                        style={{
                            fontFamily: "Roboto",
                            color: "#A2ABB8",
                            fontSize: this.state.kmTotalFontSize
                        }}
                    >
                        km total
                    </Text>
                </View>
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