import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LoginService } from "./services/LoginService";
class LoginScreen extends Component {
  state = {
    username: "mabp@g.c",
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
  componentDidMount() {
    this.handleLogin();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1.5 }}></View>
        <View style={styles.form}>
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
        <View style={{ flex: 1.5 }}></View>
      </View>
    );
  }
}

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
    justifyContent: "space-between"
  }
});
