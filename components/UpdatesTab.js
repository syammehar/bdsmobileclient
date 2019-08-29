import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Notification from "./Notification";
import Styles from "./Styles";
import { FetchData } from "./services/FetchData";
import timeDifference from "./services/TimeService";

export default class UpdatesTab extends Component {
  static navigationOptions = {
    drawerLabel: "Updates",
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
    Notifications: null
    // iconClass: {
    //   1: " fa-question",
    //   2: " fa-check",
    //   3: " fa-check-double"
    // },
    // modal: false
  };

  componentDidMount() {
    FetchData("notifications")
      .then(result => {
        this.setState({ Notifications: result });
        console.log(this.state.Notifications);
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      });
  }

  render() {
    if (!this.state.Notifications) {
      return <Text>No notificatins to be shown...!</Text>;
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
        <Text style={[Styles.title, Styles.BackgroundColor]}>Updates</Text>
        <ScrollView style={{ marginBottom: 30 }}>
          <View>{Notifications}</View>
        </ScrollView>
      </View>
    );
  }
}

// if (!this.props.Notifications) {
//   return <div>No notificatins to be shown...!</div>;
// }
// let Notifications = this.props.Notifications.map(single => {
//   return (
//     <a key={this.props.Notifications.indexOf(single)} href="#">
//       <MDBAlert
//         key={single.ID}
//         color={this.state.notificationType[single.Activity]}
//       >
//         <div className="d-flex">
//           <div className="container main-box">
//             <i className="blood-sign fas fa-tint" />
//             <i
//               className={
//                 "mark-sign fas" + this.state.iconClass[single.Activity]
//               }
//             />
//           </div>
//           <div className="container" style={{ flex: 9 }}>
//             <h5>{single.Title}</h5>
//             <p style={{ margin: 0 }}>{single.Body}</p>
//           </div>
//           <small style={{ flex: 2 }}>{single.Time}</small>
//         </div>

//         <MDBBtn
//           name={single.ID}
//           onClick={this.ConfirmClick}
//           size="sm"
//           color="warning"
//           hidden={single.Confirmed || single.Activity != "2"}
//           style={{ padding: "10px" }}
//         >
//           Confirm blood received
//         </MDBBtn>
//       </MDBAlert>
//     </a>
//   );
