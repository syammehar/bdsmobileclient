import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default class ModalLayout extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        style={{
          backgroundColor: "rgba(52, 52, 52, 0.5)",
          padding: 0,
          margin: 0
        }}
      >
        <View style={styles.container}>{this.props.children}</View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
    marginHorizontal: "5%"
  }
});
