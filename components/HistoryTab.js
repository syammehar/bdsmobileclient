import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Styles from "./Styles";
import { RadioButton } from "react-native-paper";
import History from "./History";

class HistoryTab extends Component {
  static navigationOptions = {
    drawerLabel: "History",
    drawerIcon: () => <FontAwesome name="history" size={28} color="black" />
  };
  state = {
    status: "All"
  };
  render() {
    return (
      <View>
        <Text style={[Styles.title, Styles.BackgroundColor]}>History</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            marginBottom: 10,
            paddingRight: 10
          }}
        >
          <RadioButton
            value="All"
            status={this.state.status === "All" ? "checked" : "unchecked"}
          />
          <Text
            style={styles.radio}
            onPress={() => this.setState({ status: "All" })}
          >
            All
          </Text>
          <RadioButton
            value="Requests"
            status={this.state.status === "Requests" ? "checked" : "unchecked"}
          />
          <Text
            style={styles.radio}
            onPress={() => this.setState({ status: "Requests" })}
          >
            Requests
          </Text>
          <RadioButton
            value="Accepts"
            status={this.state.status === "Accepts" ? "checked" : "unchecked"}
          />
          <Text
            style={styles.radio}
            onPress={() => this.setState({ status: "Accepts" })}
          >
            Accepts
          </Text>
          <RadioButton
            value="Donnations"
            status={
              this.state.status === "Donnations" ? "checked" : "unchecked"
            }
          />
          <Text
            style={styles.radio}
            onPress={() => this.setState({ status: "Donnations" })}
          >
            Donnations
          </Text>
        </View>
        <ScrollView style={{ marginBottom: -30 }}>
          <View>
            <History />
            <History />
            <History />
            <History />
            <History />
            <History />
            <History />
            <History />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radio: {
    marginTop: 8,
    marginLeft: -15
  }
});

export default HistoryTab;
