## Overview
Our goal is to create a sense of community among the cyclists in the city and motivate them to solve their problems together. We help them share their route data with the city and the data collection process is transparent, anonymous and the visualisation would be available to the public.

## Inspiration
As cyclists in the city, we faced some problems related to cycling infrastructure. To validate it, we talked with various cyclists in the city and found out that they had the same problems and did not have a medium to report their problems to the city. 

On the other hand, we also found out that the city does not have any data from cyclists to improve their situation.

Hence, we decided to build an easy-to-use mobile application so that we can help the community of cyclists share their data with the city.

## What it does

Our application records the user's every-day routes anonymously. It lets them share those routes with the city so that the city can improve the infrastructure based on the data.
The user does not have to change their behaviour in any way, they just need to switch the app on and off.

<a href="https://imgbb.com/"><img src="https://image.ibb.co/k7YZJd/Bildschirmfoto_2018_07_23_um_10_34_21.png" alt="Bildschirmfoto_2018_07_23_um_10_34_21" border="0"></a>
<a href="https://imgbb.com/"><img src="https://image.ibb.co/jhq3By/Bildschirmfoto_2018_07_23_um_11_29_25.png" alt="Bildschirmfoto_2018_07_23_um_11_29_25" border="0"></a>
<a href="https://imgbb.com/"><img src="https://image.ibb.co/fsyOBy/Bildschirmfoto_2018_07_23_um_11_31_49.png" alt="Bildschirmfoto_2018_07_23_um_11_31_49" border="0"></a>
<a href="https://imgbb.com/"><img src="https://image.ibb.co/hoU8dd/Bildschirmfoto_2018_07_23_um_11_29_55.png" alt="Bildschirmfoto_2018_07_23_um_11_29_55" border="0"></a>
<a href="https://imgbb.com/"><img src="https://image.ibb.co/kniZJd/Bildschirmfoto_2018_07_23_um_11_30_14.png" alt="Bildschirmfoto_2018_07_23_um_11_30_14" border="0"></a><br /><a target='_blank' href='https://poetandpoem.com/Kobayashi-Issa/poems'>Kobayashi Issa poems</a><br />

## How we built it

We build it using React Native, connected with a `Realm` database in the backend. Currently,  we store it in the local device as well as the Realm Cloud. 

We do background tracking using [react-native-mauron85-background-geolocation](https://github.com/mauron85/react-native-background-geolocation) which helps us to get the user's location even when the mobile is in standby mode.


We use `fresco` to run our fun GIF when the user cycles. 


Our database looks like this :
```
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

Generaldb.schema = {
  name: "General",
  primaryKey: 'fixed',
  properties: {
    fixed: {type: "int"},
    totalDistance: {type: "float"},
    avgSpeed: {type: "float"}
  }
};
```
## Challenges we ran into

We had first decided to use `Kotlin` for our Android application development, but we couldn't continue with it since we could not find relevant resources online - most of them were outdated.

Then we decided to learn `react` and `react-native` from scratch as we did not have any experience with it. 

Running the location tracking in the background was also very challenging for us.

We had tried a lot of database services, from `firebase` to `async storage`, but none of them gave us our desired results. We then found out about `realm`, and really liked it.

## Accomplishments that we're proud of

Finished building our minimum viable product.
Learning `react` and `react-native`.
Added cool GIFs and design.

## What we learned

* People want an easy-to-use solution.
* People like to raise the voice as a community.
* People don't mind sharing their data if it's transparent and helpful to the city.
* Passionate cyclists do not need external rewards to share their data if it improves their situation.
* People want to know what we do with their data, and whether their contribution was helpful in any way.

## What's next for Movemint

 - We want to co-operate with the city of Munich to become the official cycling app.
 - We want to provide a feedback from the city to the cyclists about the problems they solved because of them.
 - We want to have active users so that we can gather more data.
 - We also plan to add some technical features to the application: automatic tracking of users, bumping recognition using the accelerometer, voice-assisted pinning of specific issues.
 - Some community events: random rewards like free coffee from potential partners, community challenges.


## Instructions

Currently we focussed on Android devices, but iOS is planned.

To run, connect your device, and do `react-native run-android`
