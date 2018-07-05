import Realm from 'realm';

class Tripsdb extends Realm.Object { }
Tripsdb.schema = {
    name: 'Trips',
    properties: {
        tripID: { type: 'int' },
        lat: { type: 'list', objectType: 'string' },
        lon: { type: 'list', objectType: 'string' },
        time: { type: 'string' }
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

export default new Realm({ schema: [Tripsdb, Usersdb] });
