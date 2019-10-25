import React, { Component } from "react";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Styles from "./Styles";
import { PostData } from "./services/PostData.js";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  KeyboardAvoidingView
} from "react-native";

import ActionButton from "react-native-action-button";

export default class HomeTab extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: () => <Ionicons name="md-home" size={28} color="black" />
  };
  state = {
    BloodGroup: 0,
    Location: "",
    Description: ""
  };
  sendRequest = () => {
    PostData("requests", this.state)
      .then(data => {
        alert(data);
        this.setState({
          BloodGroup: 0,
          Location: "",
          Description: ""
        });
      })
      .catch(errorMessage => {
        alert(errorMessage);
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={[Styles.title, Styles.BackgroundColor]}>Home</Text>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.container}>
            <Text style={styles.tagLine}>
              Do inform others that You need their Help!
            </Text>
            <View style={{ marginTop: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 17,
                    margin: 10,
                    fontWeight: "bold",
                    marginTop: 12
                  }}
                >
                  Blood Group
                </Text>
                <Picker
                  selectedValue={this.state.BloodGroup}
                  style={{
                    height: 50,
                    width: 150
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ BloodGroup: itemValue });
                  }}
                >
                  <Picker.Item label="Select" value="0" />
                  <Picker.Item label="A+" value="1" />
                  <Picker.Item label="A-" value="2" />
                  <Picker.Item label="B+" value="3" />
                  <Picker.Item label="B-" value="4" />
                  <Picker.Item label="O+" value="5" />
                  <Picker.Item label="O-" value="6" />
                  <Picker.Item label="AB+" value="7" />
                  <Picker.Item label="AB-" value="8" />
                </Picker>
              </View>
              <TextInput
                selectionColor="black"
                label="Location"
                value={this.state.Location}
                onChangeText={Location => this.setState({ Location })}
              />
              <TextInput
                selectionColor="black"
                label="Enter Short Description"
                value={this.state.Description}
                onChangeText={Description => this.setState({ Description })}
              />

              <Button
                mode="contained"
                style={{ marginTop: 20, ...Styles.BackgroundColor }}
                onPress={this.sendRequest}
              >
                Request
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
        <ActionButton
          renderIcon={() => (
            <Ionicons name="md-more" style={styles.actionButtonIcon} />
          )}
          buttonColor="rgba(231,76,60,1)"
        >
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Open Requests"
            onPress={() => console.log("notes tapped!")}
          >
            <Ionicons name="md-heart-half" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Notifications"
            onPress={() => {
              this.props.navigation.navigate("Notifications");
            }}
          >
            <Ionicons
              name="md-notifications-off"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  },
  container: {
    padding: 20
  },
  tagLine: {
    fontSize: 20,
    margin: 10
  }
});
