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
const LoggedInStackNavigator = createStackNavigator({
  DefaultHome: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  }
});
const AppContainer = createAppContainer(StackNavigator);
const LoggedInAppContainer = createAppContainer(LoggedInStackNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isReady: false,
    LoggedIn: false
  };
  checkLogedIn = async () => {
    let token = await AsyncStorage.getItem("access_token");
    if (token && token.length > 16) {
      this.setState({ isReady: true, LoggedIn: true });
      return;
    }
    this.setState({ isReady: true, LoggedIn: false });
  };
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheSettings}
          onFinish={this.checkLogedIn}
          onError={console.warn}
        />
      );
    }
    return this.state.LoggedIn ? <LoggedInAppContainer /> : <AppContainer />;
  }

  _cacheSettings() {
    return GetURL();
  }
}
