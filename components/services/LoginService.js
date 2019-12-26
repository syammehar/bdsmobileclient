import { TokenUrl } from "./Constants";
import { AsyncStorage } from "react-native";
import { RegisterNotificationToken } from "./RegisterNotificationToken";
export function LoginService(data) {
  const url = TokenUrl;
  data = {
    username: data.username,
    password: data.password,
    grant_type: "password"
  };
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
          throw new Error("Something went wrong Error: " + res.status);
        return res.json();
      })
      .then(function(data) {
        if (data.error) throw new Error(data.error_description);
        try {
          this._storeData("access_token", data.access_token);
          this._storeData("expires_in", data.expires_in);
          this._storeData("token_type", data.token_type);
          RegisterNotificationToken();
          setTimeout(() => {
            resolve(true);
          }, 2000);
        } catch {
          throw new Error("Something went wrong");
        }
        //access_token , expires_in , token_type
      })
      .catch(error => {
        setTimeout(() => {
          reject(error.message);
        }, 1000);
      });
  });
}
