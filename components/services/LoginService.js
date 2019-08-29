import { TokenUrl } from "../variable.js";
import { AsyncStorage } from "react-native";

export function LoginService(data) {
  // const url = "http://agpstore.000webhostapp.com/postform.php";
  const url = TokenUrl;
  const bodydata =
    "username=" +
    data.username +
    "&password=" +
    data.password +
    "&grant_type=password";
  let fetchData = {
    method: "POST",
    headers: {
      "content-type": "text/plain;charset=UTF-8"
    },
    body: bodydata
  };
  _storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      // Error saving data
    }
  };
  return new Promise(async (resolve, reject) => {
    fetch(url, fetchData)
      .then(res => {
        // console.log(res);
        if (res.status !== 200)
          throw new Error("Something went wrong Error: " + res.statusText);
        return res.json();
      })
      .then(function(data) {
        console.log(data);
        if (data.error) throw new Error(data.error_description);
        this._storeData("access_token", data.access_token);
        this._storeData("expires_in", data.expires_in);
        this._storeData("token_type", data.token_type);
        resolve(true);
        //access_token , expires_in , token_type
      })
      .catch(error => {
        reject(error.message);
      });
  });
}

// .then(res => res.json())
// .then(response => console.log("Success:", JSON.stringify(response)))
// .catch(error => console.error("Error:", error));
