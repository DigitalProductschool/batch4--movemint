import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, FlatList } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button
} from "native-base";

const { width, height } = Dimensions.get("window");

class HistoryView extends Component {
  renderItem({ item, index }) {
    return <Text style={style.row}>{item}</Text>;
  }

  items = ["1", "2", "3", "4", "5", "6", "7"];

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "#79CDBE"
            }}
          >
            My stats
          </Text>
        </View>
        <View style={{ flex: 7 }}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.amountTextStyle}>154</Text>
              <Text style={styles.descriptionTextStyle}>km total</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.amountTextStyle}>13</Text>
              <Text style={styles.descriptionTextStyle}>trips</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.amountTextStyle}>14.2</Text>
              <Text style={styles.descriptionTextStyle}>avg km/h</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.amountTextStyle}>12.8</Text>
              <Text style={styles.descriptionTextStyle}>kg CO2 saved</Text>
            </View>
          </View>
        </View>
        <View style={styles.listView}>
          <List
            dataArray={this.items}
            renderRow={item => (
              <ListItem avatar>
                <Left>
                  <Text style={{ color: "#79CDBE", fontSize: 14 }}>#1</Text>
                </Left>
                <Body>
                  <Text style={{ color: "#79CDBE" }}>
                    June 27, 2018 at 17:29
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginRight: 10
                    }}
                  >
                    <View>
                      <Text style={styles.listViewInfoHeader}>Entfernung</Text>
                      <Text style={styles.listViewAmount}>6.4km</Text>
                    </View>
                    <View>
                      <Text style={styles.listViewInfoHeader}>Zeit</Text>
                      <Text style={styles.listViewAmount}>15:24</Text>
                    </View>
                    <View>
                      <Text style={styles.listViewInfoHeader}>avg km/h</Text>
                      <Text style={styles.listViewAmount}>12.7</Text>
                    </View>
                  </View>
                </Body>
              </ListItem>
            )}
          />
        </View>

        {/*<View style={styles.listView}>
                </View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.9,
    height: height,
    backgroundColor: "#424a63",
    borderWidth: 7,
    borderRadius: 20,
    borderColor: "#A2ABB8",
    marginTop: 15,
    marginBottom: 20
  },
  infoRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoItem: {
    flex: 1,
    alignItems: "center"
  },
  amountTextStyle: {
    alignSelf: "center",
    textAlign: "center",
    color: "#79CDBE",
    fontSize: 44
  },
  descriptionTextStyle: {
    alignSelf: "center",
    textAlign: "center",
    color: "#A2ABB8",
    fontSize: 16
  },
  header: {
    flex: 1,
    marginTop: 10,
    alignItems: "center"
  },
  listView: {
    flex: 9
  },
  listViewInfoHeader: {
    color: "#A2ABB8",
    fontSize: 14,
    textAlign: "center"
  },
  listViewAmount: {
    color: "#79CDBE",
    fontSize: 20,
    textAlign: "center"
  }
});

export default HistoryView;
