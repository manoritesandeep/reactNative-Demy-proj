import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({ onCancel, submitButtonLabel, onSubmit, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "", // // OR
    // date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount, // the + converts the value to a number...
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //   autoCapitalize: "sentences"
          // autoCorrent: false // default is true
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {/* {isEditing ? "Update" : "Add"} */}
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
