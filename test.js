import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

const faker = require('faker')
const Realm = require('realm')

const totalTickers = 100
const USERNAME = "Robin"
const PASSWORD = "1234"
const SERVER = "movemintserver.de1a.cloud.realm.io"

const TickerSchema = {
  name: 'Ticker',
  primaryKey: 'tickerSymbol',
  properties: {
    tickerSymbol: { type: 'string', optional: false },
    price: { type: 'int', optional: false },
    companyName: { type: 'string', optional: false },
  }
}

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSZWFsbSIsIk5vdGlmaWVyIjp0cnVlLCJTeW5jIjp0cnVlLCJpYXQiOjE1MTI2NTY3Nzh9.iKhiNXtCT5HtEZc0SKlNnZOaCU8XSpbVYCyGm6RKgw3_tQogN5Ln5oG7bfFTBNJKi0zbjKVJcFGtBhxus27BWYgdVUTH_AHswfEY4BuaRKWK1dvUPn1mx7Fp7lQHnCPwp_nvhaqDAu5h7k3w2qIrbZfojAFhOHip_TbYHN4sI_EE7xO97IXv3Ya7bbKUZnuI_W1qWrQHw3pGH8TNyRTDaqS-xk7ko-S7iNm4HLTrt9562gbMItB_yHC2_7w7jOqd8ZRxPhpehEb6sWbQxyOFzOreClmC1JB_9mYlFmb1QsgqhY-VIKvdpUca98h_0zsEcyaVqGYalpbqb6Un7vAQ6w";

export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.getStarted=this.getStarted.bind(this)
    this.generateRandomTickerSymbol=this.generateRandomTickerSymbol.bind(this)
    this.testFunc=this.testFunc.bind(this)
  }

  generateRandomTickerSymbol(len) {
    charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    for (let i = 0; i < len; i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }

  getStarted() {
    console.log("HereWeGo!");
    Realm.Sync.User.login(`https://${SERVER}`, USERNAME, PASSWORD)
      .then(user => {
        Realm.open({
          sync: {
            url: `realms://${SERVER}/~/tickers`,
            user: user
          },
          schema: [TickerSchema],
        })
          .then(realm => {
            let tickerResults = realm.objects('Ticker')
            // Add some data to the tickers Realms
            if (tickerResults.length < totalTickers) {
              realm.write(() => {
                for (let index = 0; index < totalTickers; index++) {
                  realm.create('Ticker', {
                    tickerSymbol: this.generateRandomTickerSymbol(3),
                    price: index,
                    companyName: faker.company.companyName()
                  }, true)
                }
              })
            }

            tickerResults.addListener((objects, changes) => {
              changes.modifications.forEach((index) => {
                const ticker = objects[index];
                console.log(`Ticker ${ticker.companyName} - ${ticker.tickerSymbol} - ${ticker.price}`)
              });
            })
          })
      }).catch(error => {
      console.log("AUTH ERROR")
    })
  }

  testFunc() {
    console.log("Username: " + USERNAME)
  }

  render(){
    return(
      <View>
        <Button title="Start Realm" onPress={this.getStarted}/>
      </View>
    )
  }
}
