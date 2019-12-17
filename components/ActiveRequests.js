import React, { Component } from "react";
import { Card, Title, Paragraph,Button, TouchableHighlight } from "react-native-paper";
import { Text, ScrollView, View } from "react-native";
import timeDifference from "./services/TimeService";
import { FetchData } from "./services/FetchData";
import Modal from "react-native-modal";
import Styles from "./Styles";

class ActiveRequests extends Component {
  state = {
    requestData: null
  };
  componentDidMount() {
    FetchData("requests")
      .then(result => {
        this.setState({ requestData: result });
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      });
  }
  render() {
    
    if (this.state.requestData) {
      
      let requestData = this.state.requestData.map((req, index) => {
        return (
          <View style={{ margin: 5 }} key={index}>
            <Card
              style={{ elevation: 5 }}
               onPress={() => this.props.OpenDetailModel(req.ID)}
            >
              <Card.Content style={{ backgroundColor: "white" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Title style={{ marginTop: -10, fontSize: 16 }}>Hi!</Title>
                </View>
                <Paragraph style={{ fontSize: 13 }}>
                  {req.Name} needs your help at {req.Location}
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
        );
      });
      return (
        <ScrollView style={{ marginBottom: 10, maxHeight: "80%" }}>
          <View>{requestData}</View>
        </ScrollView>
      );
    }
    return (
      <View>
        <Text>Loading. . .</Text>
      </View>
    );
  }
}

export default ActiveRequests;

// <TouchableHighlight onPress={console.log("pressed")}>
// </TouchableHighlight>
