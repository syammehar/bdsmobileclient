import React, { Component } from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { Text, View } from "react-native";

class History extends Component {
  state = {};
  render() {
    return (
      <View style={{ marginTop: 2 }}>
        <Card style={{ elevation: 5 }}>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Title style={{ marginTop: -10 }}>Heading</Title>
              <Text>10:45 AM</Text>
            </View>
            <Paragraph>Description will be displayed here</Paragraph>
            <Paragraph>short note</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

export default History;
