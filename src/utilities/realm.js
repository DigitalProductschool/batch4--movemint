import Realm from "realm";

var username = "parth";
var password = "parth";
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
    user: Realm.Sync.User.all["d69bbc4d8ae909d69e418b3afad69f68"],
    url: "realms://movemintserver.de1a.cloud.realm.io/locdata"
  },
  schema: [Tripsdb, Generaldb]
});
