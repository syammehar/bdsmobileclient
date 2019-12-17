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
import HistoryItemDetail from "./HistoryItemDetail";
import Preloader from "./Preloader";
import { FetchData } from "./services/FetchData";

class HistoryTab extends Component {
  static navigationOptions = {
    drawerLabel: "History",
    drawerIcon: () => <FontAwesome name="history" size={28} color="black" />
  };
  state = {
    refreshing: false,
    itemFilterText: "all",
    History: null,
    modalVisible: false,
    url: ""
  };
  openModel = (id, type) => {
    //console.log("DATA TO SHOWN", id, type);
    this.setState({
      modalVisible: true,
      url: "history?type=" + type + "&id=" + id
    });
  };
  componentDidMount() {
    this.getHistory();
  }
  getHistory = () => {
    this.setState({ refreshing: true });
    FetchData("history")
      .then(result => {
        this.setState({ History: result });
        this.setState({ refreshing: false });
      })
      .catch(errorMessage => {
        console.log(errorMessage);
        this.setState({ refreshing: false });
      });
  };
  _onRefresh = () => {
    console.log("_onRefresh()");
    this.getHistory();
  };
  render() {
    if (!this.state.History) {
      return <Preloader></Preloader>;
    }
    //console.log(this.state.History);
    let filteredData = this.state.History.filter(element => {
      if (this.state.itemFilterText === "all") {
        return true;
      } else return element.Type.indexOf(this.state.itemFilterText) >= 0;
    }).map(element => {
      return (
        <History
          key={this.state.History.indexOf(element)}
          HistoryItem={element}
          OpenModel={(id, type) => this.openModel(id, type)}
        ></History>
      );
    });
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
            onPress={() => {
              this.setState({ itemFilterText: "all" });
              console.log("all Click");
            }}
            on
            status={
              this.state.itemFilterText === "all" ? "checked" : "unchecked"
            }
          />
          <Text
            style={styles.radio}
            onPress={() => this.setState({ itemFilterText: "all" })}
          >
            All
          </Text>
          <RadioButton
            value="Requests"
            onPress={() => this.setState({ itemFilterText: "req" })}
            status={
              this.state.itemFilterText === "req" ? "checked" : "unchecked"
            }
          />
          <Text
            style={styles.radio}
            onPress={() => this.setState({ itemFilterText: "req" })}
          >
            Requests
          </Text>
          <RadioButton
            value="Accepts"
            onPress={() => this.setState({ itemFilterText: "acp" })}
            status={
              this.state.itemFilterText === "acp" ? "checked" : "unchecked"
            }
          />
          <Text
            style={styles.radio}
            onPress={() => this.setState({ itemFilterText: "acp" })}
          >
            Accepts
          </Text>
          <RadioButton
            value="Donnations"
            onPress={() => this.setState({ itemFilterText: "don" })}
            status={
              this.state.itemFilterText === "don" ? "checked" : "unchecked"
            }
          />
          <Text
            style={styles.radio}
            onPress={() => this.setState({ itemFilterText: "don" })}
          >
            Donnations
          </Text>
        </View>

        <ScrollView style={{ marginBottom: 100 }}>
          <View>{filteredData}</View>
        </ScrollView>

        <View>
          <Modal
            visible={this.state.modalVisible}
            onRequestClose={this._hideModal}
          >
            <View
              style={{
                backgroundColor: "gray",
                padding: 30,
                borderRadius: 10,
                height: "auto"
              }}
            >
              <Text style={{ marginBottom: 10, fontSize: 20 }}>Details</Text>
              <HistoryItemDetail url={this.state.url}></HistoryItemDetail>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 20
                }}
              >
                <Button
                  style={[Styles.BackgroundColor, { marginLeft: 20 }]}
                  mode="contained"
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                >
                  Ok
                </Button>
              </View>
            </View>
          </Modal>
        </View>
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
{
  /* <Modal
          style={{ width: "80%", height: "50%" }}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          >
            <View
              style={{
                width: 300,
                height: 300,
                backgroundColor: "white"
              }}
            >
              <Text>Hello World!</Text>
              <TouchableHighlight
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
       */
}
