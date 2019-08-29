import { ApiUrl } from "../variable.js";
import { AsyncStorage } from "react-native";

export async function FetchData(path) {
  // const url = "http://agpstore.000webhostapp.com/postform.php";
  const url = ApiUrl + path;
  // let AuthData = sessionStorage.getItem("access_token");
  // console.log(AuthData);
  // return;
  let fetchData = {
    headers: {
      Authorization: "bearer " + (await AsyncStorage.getItem("access_token"))
    }
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
        console.log(data);
        resolve(data);
      })
      .catch(error => {
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
