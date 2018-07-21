export function calcDistance(newTrip) {
    var distance = 0;
    for(i=0;i<newTrip.timestamp.length - 1;i++)
    {
        var R = 6371; // km
        var dLat = toRad(newTrip.lat[i]-newTrip.lat[i+1]);
        var dLon = toRad(newTrip.lon[i]-newTrip.lon[i+1]);
        var lat1 = toRad(newTrip.lat[i]);
        var lat2 = toRad(newTrip.lat[i+1]);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        distance+=d;
    }
    console.log(distance)
    return distance;
}

function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }