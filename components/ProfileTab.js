import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import {
  Ionicons,
  Entypo,
  MaterialIcons,
  FontAwesome5
} from "@expo/vector-icons";
import Styles from "./Styles";
import { List, TextInput, Button } from "react-native-paper";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";

class ProfileTab extends Component {
  static navigationOptions = {
    drawerLabel: "Profile",
    drawerIcon: <Entypo name="user" size={26} color="black" />
  };

  state = {
    profile: {
      id: 1,
      name: "Muhammad Hamza",
      department: "BS - Computer Science",
      phone: "0347 1866623",
      bloodGroup: "O+"
    },
    isModalVisible: false,
    columnName: "",
    columnValue: "",
    image: null
  };

  _showModal = () => this.setState({ isModalVisible: true });
  _hideModal = () => this.setState({ isModalVisible: false });

  updateColumn = (columnName, columnValue) => {
    this.setState({ columnName, columnValue });
  };

  handleProfileChange = columnName => {};

  updateProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  // uploadNewProfilePhoto = () => {
  //   const options = {
  //     noData: true
  //   };
  //   ImagePicker.launchImageLibrary(options, response => {
  //     console.log(response);
  //     if (response.uri) {
  //       this.setState({ photo: response });
  //     }
  //   });
  // };

  render() {
    let { image } = this.state;

    return (
      <ScrollView>
        <Text style={[Styles.title, Styles.BackgroundColor]}>Profile</Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            flexDirection: "row"
          }}
        >
          {image != null ? (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150, borderRadius: 75 }}
            />
          ) : (
            <Image
              source={require("../profile.jpg")}
              style={{ width: 150, height: 150, borderRadius: 75 }}
            />
          )}

          <Ionicons
            name="ios-camera"
            onPress={this.updateProfilePicture}
            size={25}
            style={[styles.camera, Styles.BackgroundColor]}
          />
        </View>
        <View style={{ padding: 30 }}>
          <List.Item
            title="Name"
            description={this.state.profile.name}
            left={() => (
              <Entypo
                name="user"
                size={35}
                style={{ marginTop: 10, ...Styles.Color }}
              />
            )}
            right={() => (
              <MaterialIcons
                name="edit"
                size={20}
                style={{ marginTop: 15 }}
                onPress={() => {
                  this._showModal();
                  this.updateColumn("name", this.state.profile.name);
                }}
              />
            )}
          />
          <List.Item
            title="Department"
            description={this.state.profile.department}
            left={() => (
              <FontAwesome5
                name="university"
                size={35}
                style={{ marginTop: 10, ...Styles.Color }}
              />
            )}
            right={() => (
              <MaterialIcons
                name="edit"
                size={20}
                style={{ marginTop: 15 }}
                onPress={() => {
                  this._showModal();
                  this.updateColumn(
                    "department",
                    this.state.profile.department
                  );
                }}
              />
            )}
          />
          <List.Item
            title="Phone"
            description={this.state.profile.phone}
            left={() => (
              <MaterialIcons
                name="phone"
                size={35}
                style={{ marginTop: 10, ...Styles.Color }}
              />
            )}
            right={() => (
              <MaterialIcons
                name="edit"
                size={20}
                style={{ marginTop: 15 }}
                onPress={() => {
                  this._showModal();
                  this.updateColumn("phone", this.state.profile.phone);
                }}
              />
            )}
          />
          <List.Item
            title="Blood Group"
            description={this.state.profile.bloodGroup}
            left={() => (
              <Entypo
                name="drop"
                size={35}
                style={{ marginTop: 10, ...Styles.Color }}
              />
            )}
          />
        </View>
        <View>
          <Modal
            isVisible={this.state.isModalVisible}
            onRequestClose={this._hideModal}
          >
            <View
              style={{
                height: 220,
                backgroundColor: "gray",
                padding: 30,
                borderRadius: 10
              }}
            >
              <Text style={{ marginBottom: 10, fontSize: 20 }}>Edit</Text>
              <TextInput
                style={{ borderRadius: 5 }}
                defaultValue={this.state.columnValue}
                onChangeText={columnValue => this.setState({ columnValue })}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 20
                }}
              >
                <Button
                  style={Styles.BackgroundColor}
                  mode="contained"
                  onPress={() => {
                    this._hideModal();
                    this.handleProfileChange(this.state.columnName);
                  }}
                >
                  Save
                </Button>
                <Button
                  style={[Styles.BackgroundColor, { marginLeft: 20 }]}
                  mode="contained"
                  onPress={this._hideModal}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  camera: {
    marginTop: 100,
    marginLeft: -40,
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    paddingRight: 13,
    borderRadius: 50
  }
});

export default ProfileTab;
