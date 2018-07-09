import {msToTime} from "./msToTime";
import BackgroundTimer from "react-native-background-timer";

export function startTimerFunction() {
    this.setState({
        backgroundTimerCurrentlyGoing: true
    });

    console.log("Timer Started!");
    this.intervalId = BackgroundTimer.setInterval(() => {
        // this will be executed every 200 ms
        // even when app is the the background
        this.state.rideDurationSeconds++;
        console.log("Dauer: " + this.state.rideDurationSeconds);

        this.currentMilliseconds = this.state.rideDurationSeconds * 1000;

        this.newTime = msToTime(this.currentMilliseconds);

        this.setState({
            rideTimer: this.newTime
        })

    }, 1000);
}