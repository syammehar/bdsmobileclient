import { TokenUrl } from "../variable.js";
import { AsyncStorage } from "react-native";
import { RegisterNotificationToken } from "./RegisterNotificationToken";
export function LoginService(data) {
  const url = TokenUrl;
  data = {
    username: data.username,
    password: data.password,
    grant_type: "password"
  };
  console.log(url, JSON.stringify(data));
  // const bodydata =
  //   "username=" +
  //   data.username +
  //   "&password=" +
  //   data.password +
  //   "&grant_type=password";

  let fetchData = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  };

  _storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {}
  };

  return new Promise(async (resolve, reject) => {
    fetch(url, fetchData)
      .then(res => {
        if (res.status !== 200)
          throw new Error("Something went wrong Error: " + res.statusText);
        return res.json();
      })
      .then(function(data) {
        if (data.error) throw new Error(data.error_description);
        this._storeData("access_token", data.access_token);
        this._storeData("expires_in", data.expires_in);
        this._storeData("token_type", data.token_type);
        RegisterNotificationToken();
        resolve(true);
        //access_token , expires_in , token_type
      })
      .catch(error => {
        reject(error.message);
      });
  });
}
