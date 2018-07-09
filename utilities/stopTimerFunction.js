import BackgroundTimer from "react-native-background-timer";

export function stopTimerFunction() {
    console.log("Timer Stopped!");
    BackgroundTimer.clearInterval(this.intervalId);
}