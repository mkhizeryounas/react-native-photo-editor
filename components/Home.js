import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  NativeModules,
  Alert,
  Share,
  ActivityIndicator
} from "react-native";
import OfflineNotice from "./OfflineNotice";

import {
  Title,
  ImageBackground,
  Subtitle,
  Divider,
  Tile,
  View,
  ListView,
  TouchableOpacity,
  Button,
  Icon,
  Card,
  Image,
  Caption
} from "@shoutem/ui";

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Greeting Cards",
      headerRight: (
        <Button
          onPress={() => {
            Share.share({
              message: "Custom Greeting Cards \n Link: http://www.shopdesk.co"
            });
          }}
          styleName="clear"
        >
          <Icon name="share" />
        </Button>
      )
    };
  };

  constructor(props) {
    super(props);
    // this.renderRow = this.renderRow.bind(this);
    this.state = {
      cards: [
        {
          name: "Complete Eid Cards",
          sunheading: "Use pre made eid cards.",
          image: {
            url:
              "https://shoutem.github.io/static/getting-started/restaurant-1.jpg"
          },
          type: "cards"
        },
        {
          name: "Complete background designs",
          sunheading:
            "Use custom backgrounds, and customize according to your needs",
          image: {
            url:
              "https://shoutem.github.io/static/getting-started/restaurant-2.jpg"
          },
          type: "backgrounds"
        },
        {
          name: "Independence Day Cards",
          sunheading: "Send Pre Made Independence Cards",
          image: {
            url:
              "https://shoutem.github.io/static/getting-started/restaurant-3.jpg"
          },
          type: "indcards"
        }
      ]
    };
  }
  handleRoute(type, name) {
    // Alert.alert("Route", `Route to list view with ${type} params`);
    const { navigate } = this.props.navigation;
    navigate("Gallery", { name, type });
  }

  renderRow = card => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.handleRoute(card.type, card.name)}
        >
          <ImageBackground
            styleName="large-banner"
            source={{ uri: card.image.url }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom">{card.name}</Title>
              <Subtitle styleName="sm-gutter-horizontal">
                {card.sunheading}
              </Subtitle>
            </Tile>
          </ImageBackground>
        </TouchableOpacity>
        <Divider styleName="line" />
      </View>
    );
  };
  render() {
    const cards = this.state.cards;
    return (
      <View style={{ flex: 1 }}>
        <OfflineNotice />
        <ListView data={cards} renderRow={this.renderRow} />
      </View>
    );
  }
}
