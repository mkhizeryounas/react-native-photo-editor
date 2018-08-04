import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  NativeModules,
  Alert,
  ActivityIndicator
} from "react-native";

import {
  Title,
  View,
  Button,
  ListView,
  TouchableOpacity,
  ImageBackground,
  Tile,
  Subtitle,
  Divider,
  Card,
  Image,
  Caption
} from "@shoutem/ui";
const http = require("axios");

export default class Gallery extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
    };
  };
  constructor(props) {
    super(props);
    // this.renderRow = this.renderRow.bind(this);
    this.state = {
      cards: []
    };
  }
  async handleEdit(url) {
    await NativeModules.PhotoSwift.addEvent(url);
    console.log("now good");
  }

  componentDidMount = () => {
    this.getData(this.props.navigation.getParam("type"));
  };

  getData = async str => {
    this.setState({ fetching: true });
    str = typeof str === "undefined" ? "" : str;
    let data = await http.get(
      `https://eid-cards-editor.firebaseio.com/${str}.json`
    );
    console.log(data);
    let result = [];
    for (d in data.data) {
      result.push({ url: data.data[d]["cardURL"] });
    }
    console.log(result);
    this.setState({ cards: result, fetching: false });
  };

  renderRow = card => {
    return (
      <View>
        <TouchableOpacity onPress={() => this.handleEdit(card.url)}>
          <Card style={{ width: "100%", marginBottom: 5 }}>
            <Image
              styleName="large-banner"
              source={{
                uri: card.url
              }}
            />
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const cards = this.state.cards;
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator
          size="small"
          color="#bdc3c7"
          animating={this.state.fetching}
          style={{
            flex: 1,
            justifyContent: "center",
            position: "absolute",
            top: "40%",
            left: "50%",
            zIndex: 99
          }}
        />
        <ListView data={cards} renderRow={this.renderRow} />
      </View>
    );
  }
}
