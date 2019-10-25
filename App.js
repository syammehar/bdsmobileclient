import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Styles from "./components/Styles";
import LoginScreen from "./components/LoginScreen";
import Home from "./Home";

const StackNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  DefaultHome: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(StackNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
