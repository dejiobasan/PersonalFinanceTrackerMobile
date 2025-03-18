import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useNavigation, useRouter } from "expo-router";
import { Trash2, Edit } from "lucide-react-native";

const ViewAllTransactions = () => {
  const {
    transactions,
    fetchAllTransactions,
    deleteTransaction,
    deleteAllTransactions,
  } = useTransactionStore();
  const [filter, setFilter] = useState<"all" | "Credit" | "Debit">("all");

  useEffect(() => {
    fetchAllTransactions();
  }, [fetchAllTransactions]);

  const filteredTransactions = transactions.filter((t) =>
    filter === "all" ? true : t.Type === filter
  );

  const navigation = useNavigation();
  const router = useRouter();

  const handleDeleteAll = async () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete all transactions?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteAllTransactions();
              fetchAllTransactions();
            } catch (error) {
              console.error("Failed to delete all transactions", error);
            }
          },
        },
      ]
    );
  };

  const handleDeleteTransaction = (id: string) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteTransaction(id);
              fetchAllTransactions();
            } catch (error) {
              console.error("Failed to delete transaction", error);
              Alert.alert("Error", "Failed to delete the transaction.");
            }
          },
        },
      ]
    );
  };

  type Transaction = {
    _id: string;
    Date: string;
    Description: string;
    Amount: number;
    Type: "Credit" | "Debit";
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionDate}>{item.Date}</Text>
      <Text style={styles.transactionDescription}>{item.Description}</Text>
      <Text
        style={[
          styles.transactionAmount,
          { color: item.Type === "Credit" ? "blue" : "red" },
        ]}
      >
        &#8358;{Math.abs(item.Amount)}
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => router.push(`/edit/${item._id}`)}>
          <Edit size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTransaction(item._id)}>
          <Trash2 size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>All Transactions</Text>

      <View style={styles.filterButtons}>
        {["all", "Credit", "Debit"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type as "all" | "Credit" | "Debit")}
            style={[
              styles.filterButton,
              {
                backgroundColor: filter === type ? "blue" : "gray",
                borderWidth: filter === type ? 2 : 0,
                borderColor: filter === type ? "white" : "transparent",
              },
            ]}
          >
            <Text style={styles.filterText}>{type}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={handleDeleteAll}
          style={styles.deleteAllButton}
        >
          <Text style={styles.filterText}>Delete All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.noTransactions}>No transactions found.</Text>
          </View>
        }
      />
    </View>
  );
};

export default ViewAllTransactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteAllButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
  },
  filterText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  transactionItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    marginRight: 10, // 👈 Adds spacing between items
    elevation: 3,
    width: 150,
  },
  transactionDate: {
    fontSize: 14,
    color: "#555",
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "500",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  noTransactions: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
