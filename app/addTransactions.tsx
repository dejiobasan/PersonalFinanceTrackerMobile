import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useNavigation } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const AddTransactions = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    type: "Credit",
  });
  const navigation = useNavigation();

  const { addTransaction, loading } = useTransactionStore();

  const handleSubmit = async () => {
    try {
      await addTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      navigation.navigate("Dashboard" as never);
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <View>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.title}>Add Transaction</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={(value) => handleInputChange("amount", value)}
            placeholder="Enter the transaction amount"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            multiline
            value={formData.description}
            onChangeText={(value) => handleInputChange("description", value)}
            placeholder="Describe the transaction"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type</Text>
          <Picker
            selectedValue={formData.type}
            onValueChange={(value) => handleInputChange("type", value)}
            style={styles.picker}
          >
            <Picker.Item label="Credit" value="Credit" />
            <Picker.Item label="Debit" value="Debit" />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => navigation.navigate("Dashboard" as never)}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Add</Text>
          )}
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default AddTransactions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    margin: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: "gray",
  },
  submitButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
