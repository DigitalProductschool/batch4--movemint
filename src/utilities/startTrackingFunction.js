import { startTrack } from "./startTrack";
import { LayoutAnimation, NativeModules } from "react-native";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export function startTrackingFunction(props, that) {
  startTrack();

  // Animate the update
  console.log("***********");
  console.log(props.buttonStatus);
  console.log("**************");

  LayoutAnimation.spring();
  that.setState({
    buttonStatus: "stopButton",
    startButtonBorderRadius: props.stopButtonBorderRadius,
    startButtonHeight: props.stopButtonHeight,
    startButtonWidth: props.stopButtonWidth,
    startButtonBorderWidth: props.stopButtonBorderWidth,

    timerFontSize: props.recordingTimerFontSize,
    timerMargin: props.recordingTimerMargin,

    currentButtonText: "stop",

    backgroundTimerActivated: true
  });
}
