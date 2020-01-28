import React, { Component } from "react";
import { View, Text, Image, RefreshControl, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Notification from "./Notification";
import Styles from "./Styles";
import { FetchData } from "./services/FetchData";
import { PostData } from "./services/PostData.js";
import timeDifference from "./services/TimeService";
import Spinner from "./Spinner";
import ModalLayout from "./ModalLayout";

export default class NotificationsTab extends Component {
  static navigationOptions = {
    drawerLabel: "Notifications",
    drawerIcon: () => (
      <Ionicons name="md-notifications" size={28} color="black" />
    )
  };
  state = {
    Location: "PIMS, Islamabad",
    notificationType: {
      1: "#f8d7da",
      2: "#fff3cd",
      3: "#e2e3e5"
    },
    refreshing: false,
    Notifications: null,
    ShowSpinner: false,
    IdToConfirm: 0,
    modalVisible: false
  };
  ConfirmReceived = id => {
    this.setState({ IdToConfirm: id, modalVisible: true });
  };
  componentDidMount() {
    this.getNotifications();
  }
  updateToConfirmed = id => {
    const Confirmed = true;
    this.setState({
      Notifications: this.state.Notifications.map(el =>
        el.ID == id ? { ...el, Confirmed } : el
      )
    });
  };

  PostConfirm = () => {
    this.setState({ ShowSpinner: true });
    PostData("Transfusions", {
      NotificationID: this.state.IdToConfirm,
      Location: this.state.Location
    })
      .then(resp => {
        this.setState({ ShowSpinner: false, modalVisible: false });
        this.updateToConfirmed(this.state.IdToConfirm);
        alert(resp.Message);
      })
      .catch(errorResp => {
        this.setState({ ShowSpinner: false, modalVisible: false });
        alert(errorResp.Message);
      });
  };
  getNotifications = () => {
    this.setState({ refreshing: true });
    this.ShowSpinner();
    FetchData("notifications")
      .then(resp => {
        this.setState({ Notifications: resp.Data });
        this.setState({ refreshing: false });
        this.HideSpinner();
      })
      .catch(errorMessage => {
        this.setState({ refreshing: false });
        this.HideSpinner();
      });
  };
  _onRefresh = () => {
    this.getNotifications();
  };
  render() {
    if (!this.state.Notifications) {
      return <Spinner visible={this.state.ShowSpinner}></Spinner>;
    }
    let Notifications = this.state.Notifications.map((notification, index) => {
      return (
        <Notification
          key={notification.ID}
          notificationType={this.state.notificationType[notification.Activity]}
          title={notification.Title}
          description={notification.Body}
          notificationTime={timeDifference(notification.Time)}
          notif={notification}
          ConfirmReceived={id => this.ConfirmReceived(id)}
        />
      );
    });
    return (
      <View>
        <Text style={[Styles.title, Styles.BackgroundColor]}>
          Notifications
        </Text>
        <ScrollView
          style={{ marginBottom: 30 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            ></RefreshControl>
          }
        >
          <View>{Notifications}</View>
        </ScrollView>
        <ModalLayout visible={this.state.modalVisible}>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>
            Confirmation Details
          </Text>

          <ScrollView style={{ marginBottom: 10, maxHeight: "80%" }}>
            <View>
              <TextInput
                maxLength={100}
                label="Where You received the blood"
                style={{ borderRadius: 5 }}
                value={this.state.Location}
                onChangeText={Location => this.setState({ Location })}
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
              onPress={this.PostConfirm}
            >
              Confirm
            </Button>
            <Button
              style={{ marginLeft: 20, backgroundColor: "orange" }}
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

  ShowSpinner = () => {
    this.setState({ ShowSpinner: true });
  };
  HideSpinner = () => {
    this.setState({ ShowSpinner: false });
  };
}
