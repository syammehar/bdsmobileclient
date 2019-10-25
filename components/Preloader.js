import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import PreloaderImage from "../assets/preloader.gif";

export default class Preloader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={PreloaderImage}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
