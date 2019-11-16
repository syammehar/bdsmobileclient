import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableHighlight,
  Alert
} from "react-native";
import Styles from "./Styles";
import { RadioButton } from "react-native-paper";
import History from "./History";
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
    modalVisible: false
  };
  openModel = () => {
    this.setState({ modalVisible: true });
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
    this.getHistory();
  };
  render() {
    if (!this.state.History) {
      return <Preloader></Preloader>;
    }
    //console.log(this.state.History);
    let filteredData = this.state.History.filter(element => {
      if (this.state.itemFilterText === "all") {
        console.log(element);
        return true;
      } else return element.Type.indexOf(this.state.itemFilterText) >= 0;
    }).map(element => {
      return (
        <History
          key={this.state.History.indexOf(element)}
          HistoryItem={element}
          OpenModel={this.openModel}
        ></History>
        // <MDBListGroupItem key={this.state.History.indexOf(element)} hover>
        //   <div className="d-flex w-100 justify-content-between">
        //     <h5 className="mb-1">{element.Title}</h5>
        //     <small className="text-muted">{timeDifference(element.Time)}</small>
        //   </div>
        //   <a
        //     onClick={this.ItemClicked}
        //     name={element.ID}
        //     className={element.Type}
        //   >
        //     {element.Description}
        //   </a>
        //   <span className="sr-only" name={element.Type} />
        // </MDBListGroupItem>
      );
    });
    //{ 1: "all", 2: "req", 3: "acp", 4: "don" }
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
            onPress={() => this.setState({ itemFilterText: "all" })}
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
        <ScrollView style={{ marginBottom: 60 }}>
          <View>{filteredData}</View>
        </ScrollView>
        <Modal
          style={{ width: "80%", height: "50%" }}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
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
