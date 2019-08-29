import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import HomeTab from "./components/HomeTab";
import UpdatesTab from "./components/UpdatesTab";
import HistoryTab from "./components/HistoryTab";
import ProfileTab from "./components/ProfileTab";
import SettingsTab from "./components/SettingsTab";
import Styles from "./components/Styles";
import LoginTab from "./components/LoginTab";

const DrawerNavigator = createDrawerNavigator({
  Home: HomeTab,
  Updates: UpdatesTab,
  History: HistoryTab,
  Profile: ProfileTab,
  Settings: SettingsTab
});
const StackNavigator = createStackNavigator(
  {
    LoginTab: LoginTab,
    DefaultHome: DrawerNavigator
  },
  {
    defaultNavigationOptions: data => {
      return {
        title: "Blood Donation",
        headerLeft: (
          <Ionicons
            style={{ marginLeft: 15 }}
            name="md-menu"
            size={32}
            color="white"
            onPress={() => data.navigation.toggleDrawer()}
          />
        ),
        headerStyle: {
          ...Styles.BackgroundColor
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };
    }
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
