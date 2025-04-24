import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

function Subtitle({ children }) {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    // margin: 4,
    // padding: 6,
    // borderBottomColor: "white",
    // borderBottomWidth: 2,
  },
  subtitleContainer: {
    padding: 6,
    // margin: 4,
    marginHorizontal: 12,
    marginVertical: 16,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
  },
});
