import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { Trash2, Edit } from "lucide-react-native";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useRouter, useNavigation } from "expo-router";
import Navbar from "./components/Navbar";

const TransactionList = () => {
  const { transactions, fetchUserTransactions, deleteTransaction } =
    useTransactionStore();
  const [filter, setFilter] = useState<"all" | "Credit" | "Debit">("all");

  useEffect(() => {
    fetchUserTransactions();
  }, [fetchUserTransactions]);

  const filteredTransactions = transactions.filter((t) =>
    filter === "all" ? true : t.Type === filter
  );

  const navigation = useNavigation();
  const router = useRouter();

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteTransaction(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Transactions</Text>
        <View style={styles.filterContainer}>
          {["all", "Credit", "Debit"].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setFilter(type as "all" | "Credit" | "Debit")}
              style={[
                styles.filterButton,
                filter === type && styles.activeFilter,
              ]}
            >
              <Text
                style={filter === type ? styles.activeText : styles.filterText}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredTransactions.length > 0 ? (
          <FlatList
            data={filteredTransactions}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.transactionText}>{item.Date}</Text>
                <Text style={styles.transactionText}>{item.Description}</Text>
                <Text
                  style={[
                    styles.amountText,
                    item.Type === "Credit"
                      ? styles.creditText
                      : styles.debitText,
                  ]}
                >
                  &#8358;{Math.abs(item.Amount)}
                </Text>
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    onPress={() => router.push(`/edit/${item._id}`)}
                  >
                    <Edit size={20} color="#007BFF" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item._id)}>
                    <Trash2 size={20} color="#FF0000" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noTransactionText}>No transactions found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: "#007BFF",
  },
  filterText: {
    color: "#000",
  },
  activeText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  transactionItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    marginRight: 10, 
    elevation: 3,
    width: 150,
  },
  transactionText: {
    flex: 1,
    fontSize: 14,
  },
  amountText: {
    fontWeight: "bold",
  },
  creditText: {
    color: "#007BFF",
  },
  debitText: {
    color: "#FF0000",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  noTransactionText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});

export default TransactionList;
