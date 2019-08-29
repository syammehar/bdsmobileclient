import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { Ionicons, Octicons, Entypo } from "@expo/vector-icons";
import Styles from "./Styles";

class SettingsTab extends Component {
  static navigationOptions = {
    drawerLabel: "Settings",
    drawerIcon: <Ionicons name="md-settings" size={26} />
  };
  state = {};
  render() {
    return (
      <View>
        <Text style={[Styles.title, Styles.BackgroundColor]}>Settings</Text>
        <View>
          <List.Item
            title="Account"
            description="Email, Change Password"
            left={() => <Octicons name="key" size={26} style={styles.icon} />}
          />
          <List.Item
            title="Privacy"
            description="Status"
            left={() => <Entypo name="shield" size={26} style={styles.icon} />}
          />
        </View>
      </View>
    );
  }
}

export default SettingsTab;

const styles = StyleSheet.create({
  icon: {
    margin: 15
  }
});
