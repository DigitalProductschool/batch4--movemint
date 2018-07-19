import Realm from 'realm';

var username = 'parth';
var password = 'parth';
var server = 'https://movemintserver.de1a.cloud.realm.io/';

class Tripsdb extends Realm.Object { }
Tripsdb.schema = {
    name: 'Trips',
    properties: {
        tripID: { type: 'int' },
        lat: { type: 'list', objectType: 'string' },
        lon: { type: 'list', objectType: 'string' },
        timestamp: { type: 'list', objectType: 'string' }
    }
};

class Usersdb extends Realm.Object { }
Usersdb.schema = {
    name: 'Users',
    properties: {
        userName: { type: 'string' },
        userID: { type: 'int' },
        totalDistance: { type: 'int' },
        totalTrips: { type: 'int' },
        trips: { type: 'list', objectType: 'Trips' }
    }
};
Realm.Sync.User.login(server, username, password, (error, user) => {
    if (!error) {
      console.log(user)
    }
})
export default new Realm({sync:{user: Realm.Sync.User.current, url: 'realms://movemintserver.de1a.cloud.realm.io/~/locationdata',}, schema: [Tripsdb, Usersdb] });