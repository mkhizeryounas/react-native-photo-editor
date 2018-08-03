import React, { Component } from "react";
import { Platform, StyleSheet, Text, NativeModules, Alert } from "react-native";

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
import Axios from "../node_modules/axios";

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
  handleEdit(url) {
    NativeModules.PhotoSwift.addEvent(url);
  }

  componentDidMount = () => {
    this.getData(this.props.navigation.getParam("type"));
  };

  getData = async str => {
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
    this.setState({ cards: result });
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
    return <ListView data={cards} renderRow={this.renderRow} />;
  }
}
