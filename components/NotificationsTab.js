import React, { Component } from "react";
import { View, Text, Image, RefreshControl, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Notification from "./Notification";
import Styles from "./Styles";
import { FetchData } from "./services/FetchData";
import timeDifference from "./services/TimeService";
import Spinner from "./Spinner";

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
    ShowSpinner: false
  };

  componentDidMount() {
    this.getNotifications();
  }
  getNotifications = () => {
    this.setState({ refreshing: true });
    this.ShowSpinner();
    FetchData("notifications")
      .then(result => {
        this.setState({ Notifications: result });
        this.setState({ refreshing: false });
        this.HideSpinner();
      })
      .catch(errorMessage => {
        console.log(errorMessage);
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
