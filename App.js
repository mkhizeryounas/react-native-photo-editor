import React, { Component } from "react";
import { Platform, StyleSheet, Text, NativeModules } from "react-native";

import { NavigationBar, Icon, Screen, Button } from "@shoutem/ui";
import { createStackNavigator } from "react-navigation";

import Home from "./components/Home";
import Gallery from "./components/Gallery";

// export default class App extends Component {
//   componentDidMount() {}

//   handleTap() {
//     NativeModules.PhotoSwift.addEvent();
//   }

//   render() {
//     return (
//       <Screen>
//         <NavigationBar
//           title="Greeting Cards"
//           styleName="inline"
//           share={{
//             link: "https://www.shopdesk.co",
//             text: "Custom Greeting Cards",
//             title: "Super cool custom greeting cards app"
//           }}
//           leftComponent={
//             <Button onPress={() => this.handleTap()}>
//               <Icon name="edit" />
//             </Button>
//           }
//         />
//       </Screen>
//     );
//   }
// }
const App = createStackNavigator({
  Home: { screen: Home },
  Gallery: { screen: Gallery }
});

export default App;
