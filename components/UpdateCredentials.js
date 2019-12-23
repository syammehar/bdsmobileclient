import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { Ionicons, Octicons, Entypo } from "@expo/vector-icons";
import Styles from "./Styles";

class UpdateCredentials extends Component {
  static navigationOptions = {
    drawerLabel: "Settings",
    drawerIcon: <Ionicons name="md-settings" size={26} />
  };
  state = {};
  render() {
    return (
      <View>
        <Text style={[Styles.title, Styles.BackgroundColor]}>
          Update Credentials
        </Text>
      </View>
    );
  }
}

export default UpdateCredentials;

const styles = StyleSheet.create({
  icon: {
    margin: 15
  }
});
