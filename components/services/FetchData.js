//import { ApiUrl } from "./Constants";
import { AsyncStorage } from "react-native";

export async function FetchData(path, sDelay = 1000, fDelay = 500) {
  const url = (await AsyncStorage.getItem("ApiUrl")) + path;
  let fetchData = {
    headers: {
      Authorization: await AsyncStorage.getItem("access_token")
    }
  };
  return new Promise((resolve, reject) => {
    fetch(url, fetchData)
      .then(res => {
        if (res.status === 200) return res.json();

        throw new Error("Something went wrong Error: " + res.status);
      })
      .then(function(resp) {
        if (resp.Code > 0 && resp.Code <= 50) throw new Error(resp.Message);
        setTimeout(() => {
          resolve(resp);
        }, sDelay);
      })
      .catch(error => {
        setTimeout(() => {
          reject(error.message);
        }, fDelay);
      });
  });
}
