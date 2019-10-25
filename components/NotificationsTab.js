import React, { Component } from "react";
import { View, Text, Image, RefreshControl, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Notification from "./Notification";
import Styles from "./Styles";
import { FetchData } from "./services/FetchData";
import timeDifference from "./services/TimeService";
import Preloader from "./Preloader";

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
    Notifications: null
    // iconClass: {
    //   1: " fa-question",
    //   2: " fa-check",
    //   3: " fa-check-double"
    // },
    // modal: false
  };

  componentDidMount() {
    this.getNotifications();
  }
  getNotifications = () => {
    this.setState({ refreshing: true });
    FetchData("notifications")
      .then(result => {
        this.setState({ Notifications: result });
        this.setState({ refreshing: false });
      })
      .catch(errorMessage => {
        console.log(errorMessage);
        this.setState({ refreshing: false });
      });
  };
  _onRefresh = () => {
    this.getNotifications();
  };
  render() {
    if (!this.state.Notifications) {
      return <Preloader></Preloader>;
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
      </View>
    );
  }
}
