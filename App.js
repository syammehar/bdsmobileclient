import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Styles from "./components/Styles";
import LoginScreen from "./components/LoginScreen";
import Home from "./Home";
import GetURL from "./components/services/URLService";
import { AppLoading } from "expo";
import { AsyncStorage } from "react-native";

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
  constructor(props) {
    super(props);
    GetURL();
  }
  state = {
    isReady: false
  };
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheSettings}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <AppContainer />;
  }

  _cacheSettings() {
    return GetURL();
  }
}
