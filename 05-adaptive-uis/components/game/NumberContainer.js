import { Dimensions, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const devicewidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: devicewidth < 380 ? 12 : 24,
    margin: devicewidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: devicewidth < 380 ? 12 : 24,
    // fontWeight: "bold",
    fontFamily: "open-sans-bold",
  },
});
