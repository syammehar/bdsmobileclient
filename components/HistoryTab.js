import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Alert,
  RefreshControl
} from "react-native";
import ModalLayout from "./ModalLayout";
import Styles from "./Styles";
import { RadioButton, Button } from "react-native-paper";
import History from "./History";
import HistoryItemDetail from "./HistoryItemDetail";
import { FetchData } from "./services/FetchData";
import Spinner from "./Spinner";

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
    url: "",
    ShowSpinner: false
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
    this.ShowSpinner();
    this.setState({ refreshing: true });
    FetchData("history")
      .then(result => {
        this.setState({ History: result });
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
    this.getHistory();
  };
  render() {
    if (!this.state.History) {
      return <Spinner visible={this.state.ShowSpinner}></Spinner>;
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

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            ></RefreshControl>
          }
          style={{ marginBottom: 100 }}
        >
          <View>{filteredData}</View>
        </ScrollView>

        <View>
          <ModalLayout visible={this.state.modalVisible}>
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
          </ModalLayout>
        </View>
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

const styles = StyleSheet.create({
  radio: {
    marginTop: 8,
    marginLeft: -15
  }
});

export default HistoryTab;
