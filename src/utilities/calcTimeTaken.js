export function calcTimeTaken(newTrip) {
    const length = newTrip.timestamp.length;
    var difference = newTrip.timestamp[length - 1] - newTrip.timestamp[0];
    console.log('tdiff',difference)
    var minutes = Math.floor(parseFloat(difference)/1000);
    console.log(minutes)
    return minutes;
}