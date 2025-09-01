import { StatusBar } from "expo-status-bar";
import { Alert, Button, Platform, StyleSheet, View } from "react-native";

import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      // shouldShowBanner: true,
      // shouldShowList: true,
      shouldShowAlert: true, // //@deprecated — instead, specify shouldShowBanner and / or shouldShowList
    };
  },
});

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifications need appropriate permissions"
        );
        return;
      }

      // If we do have permission... get token
      const { pushTokenData } = await Notifications.getExpoPushTokenAsync();
      // .then(
      //   (pushTokenData) => {
      //     console.log("Push Token Data: ", pushTokenData);
      //   }
      // );
      console.log("Push Token Data: ", pushTokenData);
      // // V.Impt: Push token for a user is stored in the database. ExponentPushToken[]

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subsciption1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received...");
        console.log(notification);
        // console.log("Data Object: ", notification.request.content.data);
        // console.log(
        //   "Data Object userName: ",
        //   notification.request.content.data.userName
        // );
        const userName = notification.request.content.data.userName;
        console.log("User name: ", userName);
      }
    );
    const subsciption2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification Response Received...");
        console.log(response);
        const userName = response.notification.request.content.data.userName;
        console.log("Response User name: ", userName);
      }
    );

    return () => {
      subsciption1.remove();
      subsciption2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification.",
        data: { userName: "Sandeep" },
      },
      trigger: {
        seconds: 5,
      },
    });
    console.log("Scheduled button pressed!!!");
  }

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[]", // // Never Hardcode this token... Needs to be fetched dynamically from a database
        title: "Test - sent from a device!",
        body: "This is a test!",
      }),
    });
  }

  return (
    <View style={styles.container}>
      <View>
        <Button
          title="Schedule Notification"
          onPress={scheduleNotificationHandler}
        />
        <Button
          title="Send Push Notification"
          onPress={sendPushNotificationHandler}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
