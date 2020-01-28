import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { PostData } from "./PostData";

export async function RegisterNotificationToken() {
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  console.log(status);
  if (status !== "granted") {
    return;
  }
  let value = await Notifications.getExpoPushTokenAsync();
  console.log("Token: ", value);
  PostData("notificationToken", { Token: value })
    .then(data => {
      console.log(data.Message);
    })
    .catch(errorResp => {
      console.log(errorResp.Message);
    });
}
sendRequest = () => {};
