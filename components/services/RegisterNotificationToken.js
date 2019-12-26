import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { PostData } from "./PostData";

export async function RegisterNotificationToken() {
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    return;
  }
  let value = await Notifications.getExpoPushTokenAsync();
  PostData("notificationToken", { Token: value });
  // .then(data => {
  //   alert(data);
  // })
  // .catch(errorMessage => {
  //   alert(errorMessage);
  // });
}
sendRequest = () => {};
