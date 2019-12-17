import { ApiUrl } from "../Constants";
import { AsyncStorage } from "react-native";

export async function PostData(path, data) {
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
        if (res.status === 200 || res.status === 400) return res.json();

        throw new Error("Something went wrong Error: " + res.status);
      })
      .then(function(data) {
        console.log(data);
        if (data.error) throw new Error(data.error_description);
        resolve(data.message);
      })
      .catch(error => {
        reject(error.message);
      });
  });
}
