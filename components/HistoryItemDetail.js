import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import Styles from "./Styles";
import { RadioButton, Button } from "react-native-paper";
import History from "./History";
import { FetchData } from "./services/FetchData";

class HistoryItemDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { Details: "" };
  }
  componentDidMount() {
    this.LoadData();
  }
  LoadData = () => {
    FetchData(this.props.url)
      .then(result => {
        this.setState({ Details: result });
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      });
  };
  render() {
    switch (this.state.Details.Type) {
      case "Request": {
        return (
          <View
            style={
              {
                //flex: 9
                //justifyContent: "space-between"
                //   flexDirection: "column"
              }
            }
          >
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Type</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.Type}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Date</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.Date}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Time</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.Time}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Blood Group</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.BloodGroup}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Sent to</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.SentTo} people</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Seen by</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.SeenBy} people</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Accepted by</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.AcceptedBy} people</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Donor name</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.DonorName}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Current status</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.CurrentStatus}</Text>
              </View>
            </View>
          </View>
        );
      }
      case "Accept": {
        return (
          <View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Type</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.Type}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Request Date {"&"} Time</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.RequestTime}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Accept Date {"&"} Time</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.AcceptTime}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Blood Group</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.BloodGroup}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Request By</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.RequestBy}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Current status</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.CurrentStatus}</Text>
              </View>
            </View>
          </View>
        );
      }
      case "Donation": {
        return (
          <View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Type</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.Type}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Blood Group</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.BloodGroup}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Location</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.Location}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Date {"&"} Time</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.Time}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Request By</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.RequestBy}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Request Date {"&"} Time</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.RequestTime}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Accept Date {"&"} Time</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.AcceptTime}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.PropName}>
                <Text>Current status</Text>
              </View>
              <View style={styles.PropValue}>
                <Text>{this.state.Details.CurrentStatus}</Text>
              </View>
            </View>
          </View>
        );
      }

      default: {
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        );
      }
    }
  }
}

export default HistoryItemDetail;
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20
  },
  PropName: {
    flex: 1
  },
  PropValue: {
    flex: 1
  }
});
