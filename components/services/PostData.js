import { ApiUrl } from "./Constants";
import { AsyncStorage } from "react-native";

export async function PostData(path, data, sDelay = 1000, fDelay = 500) {
  const url = ApiUrl + path;
  console.log(url);
  let fetchData = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: await AsyncStorage.getItem("access_token")
    },
    body: JSON.stringify(data)
  };
  return new Promise((resolve, reject) => {
    fetch(url, fetchData)
      .then(res => {
        if (res.status === 200) return res.json();

        throw new Error("Something went wrong Error: " + res.status);
      })
      .then(function(resp) {
        console.log(resp);
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
