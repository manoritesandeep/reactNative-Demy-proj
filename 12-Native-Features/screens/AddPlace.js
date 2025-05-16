import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    // const result = await insertPlace(place);
    // console.log("Insert Result: ", result);
    // // LOG  Insert Result:  {"_invoke": [Function anonymous], "changes": 1,
    // "getAllAsync": [Function bound getAllAsync],
    // "getFirstAsync": [Function bound getFirstAsync], "lastInsertRowId": 2, "resetAsync": [Function bound resetAsync]}

    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
