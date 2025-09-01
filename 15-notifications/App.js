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

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
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
