import BackgroundGeolocation from "react-native-mauron85-background-geolocation";

export const stopTrack = () => {
    // unregister all event listeners
    BackgroundGeolocation.stop();
    BackgroundGeolocation.events.forEach(event =>
        BackgroundGeolocation.removeAllListeners(event)
    );
};