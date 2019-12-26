import React, { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import SpinnerImage from "../assets/spinner.gif";
import Modal from "react-native-modal";

export default class Spinner extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        style={{
          backgroundColor: "rgba(52, 52, 52, 0.3)",
          padding: 0,
          margin: 0
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "rgba(52, 52, 52, 0.4)",
              padding: 10,
              borderRadius: 10,
              flexDirection: "row"
            }}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={SpinnerImage}
            ></Image>
            <Text style={{ paddingTop: 18, paddingLeft: 5, fontSize: 15 }}>
              Please wait...
            </Text>
          </View>
        </View>
      </Modal>
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
