import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";

function MealsDetailScreen({ route }) {
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          {/* <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Ingredients</Text>
        </View> */}
          <List data={selectedMeal.ingredients} />
          {/* {selectedMeal.ingredients.map((ingredient) => (
        <Text key={ingredient}>{ingredient}</Text>
        ))} */}
          <Subtitle>Steps</Subtitle>
          {/* <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Steps</Text>
        </View> */}
          <List data={selectedMeal.steps} />
          {/* {selectedMeal.steps.map((step) => (
        <Text key={step}>{step}</Text>
        ))} */}
        </View>
      </View>
    </ScrollView>
  );
}

export default MealsDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainer: {
    maxWidth: "80%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
});
