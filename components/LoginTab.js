import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LoginService } from "./services/LoginService";
class LoginTab extends Component {
  state = {
    username: "m1@g.c",
    password: "123",
    redirectToHome: false
  };
  handleLogin = () => {
    LoginService(this.state)
      .then(async result => {
        console.log(result);
        console.log(await AsyncStorage.getItem("access_token"));
        result === true
          ? this.props.navigation.navigate("DefaultHome")
          : console.log("Navigate nai hoyaaaa");
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          label="Username"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          label="Password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button mode="contained" onPress={this.handleLogin}>
          Login
        </Button>
      </View>
    );
  }
}

export default LoginTab;
