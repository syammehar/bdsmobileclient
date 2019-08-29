import React, { Component } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class AboutTab extends Component {
  static navigationOptions = {
    drawerLabel: "About",
    drawerIcon: () => (
      <Ionicons name="md-information-circle" size={28} color="black" />
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.title, margin: 50 }}>About Tab</Text>
        <Button
          title="Back to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f4511e",
    color: "white",
    borderStyle: "solid"
  }
});
