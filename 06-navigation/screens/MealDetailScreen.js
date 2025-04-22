import { Text, View } from "react-native";

function MealsDetailScreen({ route }) {
  const mealId = route.params.mealId;

  return (
    <View>
      <Text>This is the Meal Detail Screen - ({mealId})</Text>
    </View>
  );
}

export default MealsDetailScreen;
