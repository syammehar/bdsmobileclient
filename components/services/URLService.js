import { AsyncStorage } from "react-native";
export default function GetURL() {
  return fetch("https://rebrand.ly/fuuastbdsfeconfig")
    .then(res => {
      if (res.status === 200) return res.json();
      throw new Error("Server path error" + res.status);
    })
    .then(function(resp) {
      _storeData("BaseUrl", resp.URL);
      _storeData("ApiUrl", resp.URL + "api/");
      _storeData("TokenUrl", resp.URL + "api/ApiSecurity");
    })
    .catch(error => {
      alert(error.message);
    });
}

_storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {}
};
