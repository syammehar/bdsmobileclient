import React, { Component } from "react";
import { View, Text } from "react-native";
import { Title, Paragraph, Card, Button } from "react-native-paper";

class Notification extends Component {
  state = {};
  render() {
    return (
      <View style={{ margin: 10 }}>
        <Card style={{ elevation: 5 }}>
          <Card.Content
            style={{ backgroundColor: this.props.notificationType }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Title style={{ marginTop: -10, fontSize: 16 }}>
                {this.props.title}
              </Title>
              <Text style={{ fontSize: 12 }}>
                {this.props.notificationTime}
              </Text>
            </View>
            <Paragraph style={{ fontSize: 13 }}>
              {this.props.description}
            </Paragraph>
            {this.props.notif.Activity === 2 &&
              this.ConfirmButton(
                this.props.notif.Confirmed,
                this.props.notif.ID
              )}
          </Card.Content>
        </Card>
      </View>
    );
  }
  ConfirmButton = (confirmed, id) => {
    if (confirmed) return null;
    return (
      <Button onPress={() => this.props.ConfirmReceived(id)}>
        Confirm Blood received
      </Button>
    );
  };
}

export default Notification;
