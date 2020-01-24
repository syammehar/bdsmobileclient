import React, { Component } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Ionicons, Octicons, Entypo } from "@expo/vector-icons";
import ModalLayout from "./ModalLayout";
import { List, TextInput, Button } from "react-native-paper";
import Styles from "./Styles";
import { PostData } from "./services/PostData.js";
import { FetchData } from "./services/FetchData";
import Spinner from "./Spinner";

class SettingsTab extends Component {
  static navigationOptions = {
    drawerLabel: "Settings",
    drawerIcon: <Ionicons name="md-settings" size={26} />
  };
  state = {
    OldPassword: "",
    NewPassword: "",
    RepeatPassword: "",
    Contact: "",
    Email: "",
    modalVisible: false,
    ShowSpinner: false
  };
  PerformUpdate = () => {
    let NewPassword = this.state.NewPassword;
    let RepeatPassword = this.state.RepeatPassword;
    let OldPassword = this.state.OldPassword;
    if (!OldPassword && (NewPassword || RepeatPassword)) {
      alert("Old password is required");
      return;
    }
    if (OldPassword) {
      if (
        !NewPassword ||
        !RepeatPassword ||
        NewPassword.length < 6 ||
        RepeatPassword.length < 6 ||
        OldPassword.length < 6
      ) {
        alert("Password must have at least 6 characters");
      }
      if (RepeatPassword !== NewPassword) {
        alert("New password and repeat password must match");
      }
      return;
    }
    this.ShowSpinner();
    PostData("ProfileUpdate", this.state)
      .then(resp => {
        let data = resp.Data;
        this.HideSpinner();
        alert(resp.Message);
        this.setState({ ...data, modalVisible: false });
      })
      .catch(errorMessage => {
        this.HideSpinner();
        alert(errorMessage);
      });
  };
  componentDidMount() {
    FetchData("ProfileUpdate")
      .then(resp => {
        let result = resp.Data;
        this.setState(result);
      })
      .catch(errorMessage => {});
  }
  render() {
    return (
      <View>
        <Text style={[Styles.title, Styles.BackgroundColor]}>Settings</Text>
        <View>
          <List.Item
            title="Account"
            description="Email, Change Password"
            left={() => <Octicons name="key" size={26} style={styles.icon} />}
            onPress={() => this.setState({ modalVisible: true })}
          />
          <List.Item
            title="Privacy"
            description="Status"
            left={() => <Entypo name="shield" size={26} style={styles.icon} />}
          />
        </View>
        <ModalLayout visible={this.state.modalVisible}>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>
            Update Credentials
          </Text>

          <ScrollView style={{ marginBottom: 10, maxHeight: "80%" }}>
            <View>
              <TextInput
                maxLength={100}
                secureTextEntry={true}
                label="Old Password"
                style={{ borderRadius: 5 }}
                value={this.state.OldPassword}
                onChangeText={OldPassword => this.setState({ OldPassword })}
              />
              <TextInput
                maxLength={100}
                secureTextEntry={true}
                label="New Password"
                style={{ borderRadius: 5, marginTop: 20 }}
                value={this.state.NewPassword}
                onChangeText={NewPassword => this.setState({ NewPassword })}
              />
              <TextInput
                maxLength={100}
                secureTextEntry={true}
                label="Repeat Password"
                style={{ borderRadius: 5, marginTop: 20 }}
                value={this.state.RepeatPassword}
                onChangeText={RepeatPassword =>
                  this.setState({ RepeatPassword })
                }
              />
              {this.LineSeparator()}
              <TextInput
                maxLength={100}
                label="Email"
                style={{ borderRadius: 5, marginTop: 20 }}
                value={this.state.Email}
                onChangeText={Email => this.setState({ Email })}
              />
              {this.LineSeparator()}
              <TextInput
                maxLength={100}
                label="Contact"
                style={{ borderRadius: 5, marginTop: 20 }}
                value={this.state.Contact}
                onChangeText={Contact => this.setState({ Contact })}
              />
            </View>
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 5
            }}
          >
            <Button
              style={[Styles.BackgroundColor, { marginLeft: 20 }]}
              mode="contained"
              onPress={this.PerformUpdate}
            >
              Save
            </Button>
            <Button
              style={{ marginLeft: 20, backgroundColor: "yellow" }}
              mode="contained"
              onPress={() => {
                this.setState({ modalVisible: false });
              }}
            >
              Cancel
            </Button>
          </View>
        </ModalLayout>
        <Spinner visible={this.state.ShowSpinner}></Spinner>
      </View>
    );
  }
  LineSeparator = () => (
    <View
      style={{
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginTop: 20
      }}
    />
  );

  ShowSpinner = () => {
    this.setState({ ShowSpinner: true });
  };
  HideSpinner = () => {
    this.setState({ ShowSpinner: false });
  };
}

export default SettingsTab;

const styles = StyleSheet.create({
  icon: {
    margin: 15
  }
});
