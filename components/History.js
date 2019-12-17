import React, { Component } from "react";
import { Card, Title, Paragraph, TouchableHighlight } from "react-native-paper";
import { Text, View } from "react-native";
import timeDifference from "./services/TimeService";

class History extends Component {
  state = { ID: this.props.HistoryItem.ID, type: this.props.HistoryItem.Type };
  render() {
    return (
      <View style={{ marginTop: 2 }}>
        <Card
          onPress={() => this.props.OpenModel(this.state.ID, this.state.type)}
          //key={this.props.HistoryItem.ID + "_" + this.props.HistoryItem.type}
          style={{ elevation: 5 }}
        >
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Title style={{ marginTop: -10 }}>
                {this.props.HistoryItem.Title}
              </Title>
              <Text>{timeDifference(this.props.HistoryItem.Time)}</Text>
            </View>
            <Paragraph>{this.props.HistoryItem.Description}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

export default History;

// <TouchableHighlight onPress={console.log("pressed")}>
// </TouchableHighlight>
