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
import * as ImagePicker from "expo-image-picker";
import { FetchData } from "./services/FetchData";
import { PostData } from "./services/PostData";

class ProfileTab extends Component {
  static navigationOptions = {
    drawerLabel: "Profile",
    drawerIcon: <Entypo name="user" size={26} color="black" />
  };

  state = {
    Profile: {
      BloodGroup: "",
      Contact: "",
      Degree: "",
      Department: "",
      FullName: ""
    },
    isModalVisible: false,
    columnName: "",
    columnValue: "",
    image: null,
    ProfilePhoto: ""
  };
  componentDidMount() {
    FetchData("profile")
      .then(resp => {
        this.setState({ Profile: resp.Data });
        FetchData("DownloadProfilePhoto", 500)
          .then(resp1 => {
            this.setState({ ProfilePhoto: resp1.Data.PhotoData });
          })
          .catch(errorMessage => {
            console.log(errorMessage);
          });
      })
      .catch(errorMessage => {});
  }

  updateProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 0.1
    });

    if (!result.cancelled) {
      this.setState({
        ProfilePhoto: "data:image/jpeg;base64," + result.base64
      });
      PostData("UploadPhoto", { PhotoData: this.state.ProfilePhoto }, 3000)
        .then(resp => {
          alert(resp.Message);
        })
        .catch(errorMessage => {
          alert(errorMessage);
        });
    }
  };
  render() {
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
          {this.state.ProfilePhoto != "" &&
          this.state.ProfilePhoto.startsWith("data:image/") ? (
            <Image
              source={{ uri: this.state.ProfilePhoto }}
              style={{ width: 150, height: 150, borderRadius: 75 }}
            />
          ) : (
            <Image
              source={require("../profile.png")}
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
            description={this.state.Profile.FullName}
            left={() => (
              <Entypo
                name="user"
                size={35}
                style={{ marginTop: 10, ...Styles.Color }}
              />
            )}
          />
          <List.Item
            title="Department"
            description={this.state.Profile.Department}
            left={() => (
              <FontAwesome5
                name="university"
                size={35}
                style={{ marginTop: 10, ...Styles.Color }}
              />
            )}
          />
          <List.Item
            title="Contact"
            description={this.state.Profile.Contact}
            left={() => (
              <MaterialIcons
                name="phone"
                size={35}
                style={{ marginTop: 10, ...Styles.Color }}
              />
            )}
          />
          <List.Item
            title="Blood Group"
            description={this.state.Profile.BloodGroup}
            left={() => (
              <Entypo
                name="drop"
                size={35}
                style={{ marginTop: 10, ...Styles.Color }}
              />
            )}
          />
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
/*
edit icon

  _showModal = () => this.setState({ isModalVisible: true });
  _hideModal = () => this.setState({ isModalVisible: false });

  updateColumn = (columnName, columnValue) => {
    this.setState({ columnName, columnValue });
  };

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
*/
