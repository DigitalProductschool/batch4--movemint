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

Realm.Sync.User.login(server, username, password, (error, user) => {
    if (!error) {
      console.log(user)
      console.log(error)
    }
})
export default new Realm({sync:{user: Realm.Sync.User.current, url: 'realms://movemintserver.de1a.cloud.realm.io/locdata',}, schema: [Tripsdb] });