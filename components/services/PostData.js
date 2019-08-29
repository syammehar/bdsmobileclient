import { ApiUrl } from "../variable.js";
import { AsyncStorage } from "react-native";

export async function PostData(path, data) {
  // const url = "http://agpstore.000webhostapp.com/postform.php";
  const url = ApiUrl + path;
  console.log(data);
  let fetchData = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "bearer " + (await AsyncStorage.getItem("access_token"))
    },
    body: JSON.stringify(data)
  };
  return new Promise((resolve, reject) => {
    fetch(url, fetchData)
      .then(res => {
        if (res.status !== 200)
          throw new Error("Something went wrong Error: " + res.statusText);
        return res.json();
      })
      .then(function(data) {
        if (data.error) throw new Error(data.error_description);
        resolve(data.message);
      })
      .catch(error => {
        console.log(error);
        reject(error.message);
      });
  });

  // .then(function(e) {
  //   if (e.status !== 200) throw new Error("Something went wrong");
  //   console.log(e);
  // })
  // .catch(error => {
  //   console.log(error);
  // });
}
