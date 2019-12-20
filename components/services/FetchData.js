import { ApiUrl } from "./Constants";
import { AsyncStorage } from "react-native";

export async function FetchData(path) {
  const url = ApiUrl + path;
  console.log(url);
  let fetchData = {
    headers: {
      Authorization: await AsyncStorage.getItem("access_token")
    }
  };
  return new Promise((resolve, reject) => {
    fetch(url, fetchData)
      .then(res => {
        if (res.status === 200 || res.status === 400) return res.json();

        throw new Error("Something went wrong Error: " + res.status);
      })
      .then(function(data) {
        //if (data.error) throw new Error(data.error_description);
        resolve(data);
      })
      .catch(error => {
        reject(error.message);
      });
  });
}
