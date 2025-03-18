import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Plus, ArrowLeft } from "lucide-react-native";
import Navbar from "../components/Navbar";
import { useLocalSearchParams  } from "expo-router";

const UpdateTransactionPage = () => {
  const { transactions, updateTransaction, loading, fetchUserTransactions } =
    useTransactionStore();
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    type: "Credit",
  });

  useEffect(() => {
    fetchUserTransactions();
  }, [fetchUserTransactions]);

  const transaction = transactions?.find((t) => t._id === id);

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.Date || "",
        description: transaction.Description || "",
        amount: String(transaction.Amount || ""),
        type: transaction.Type || "Credit",
      });
    }
  }, [transaction]);

  if (!id) {
    return <Text style={styles.errorText}>Invalid Transaction ID</Text>;
  }

  if (!transaction) {
    return <Text style={styles.errorText}>Transaction not found</Text>;
  }

  const handleChange = (key: keyof typeof formData, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateTransaction(id, {
        ...formData,
        amount: Number(formData.amount),
      });
      Alert.alert("Success", "Transaction updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Update failed. Please try again.");
      console.error("Update failed", error);
    }
  };

  return (
    <View>
      <Navbar />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Update Transaction</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={formData.date}
          onChangeText={(text) => handleChange("date", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(text) => handleChange("amount", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => handleChange("description", text)}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Type (Credit/Debit)"
          value={formData.type}
          onChangeText={(text) => handleChange("type", text)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <>
                <Plus size={18} color="white" />
                <Text style={styles.buttonText}>Update</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#6C757D",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  submitButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
});

export default UpdateTransactionPage;
