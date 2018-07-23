import Realm from "realm";

var username = "Robinbux";
var password = "1234";
var server = "https://movemintserver.de1a.cloud.realm.io/";

class Tripsdb extends Realm.Object {}
Tripsdb.schema = {
  name: "Trips",
  properties: {
    tripID: { type: "int" },
    lat: { type: "list", objectType: "string" },
    lon: { type: "list", objectType: "string" },
    timestamp: { type: "list", objectType: "string" },
    distance: {type: "float"},
    timetaken: {type: "float"},
    avgSpeed: {type: "float"}
  }
};

class Generaldb extends Realm.Object {}
Generaldb.schema = {
  name: "General",
  primaryKey: 'fixed',
  properties: {
    fixed: {type: "int"},
    totalDistance: {type: "float"},
    avgSpeed: {type: "float"}
  }
};

Realm.Sync.User.login(server, username, password, (error, user) => {
  if (!error) {
    console.log(user);
    console.log(error);
  }
});
export default new Realm({
  sync: {
    user: Realm.Sync.User.all["9cc1137cc9f3a3c3ca60162537ba8df9"],
    url: "realms://movemintserver.de1a.cloud.realm.io/locdata"
  },
  schema: [Tripsdb, Generaldb]
});
