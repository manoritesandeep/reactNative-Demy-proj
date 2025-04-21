import * as SystemUI from "expo-system-ui"; // ios background color hack // // npx expo install expo-system-ui

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <CategoriesScreen />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    //   backgroundColor: "#24180f", // Set the default background color here
  },
});

SystemUI.setBackgroundColorAsync("#24180f"); // ios background color hack
