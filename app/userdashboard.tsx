import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useRouter, useNavigation } from "expo-router";
import UserChart from "./components/userChart";
import Navbar from "./components/Navbar";

const Userdashboard = () => {
  const { logout } = useUserStore();
  const {
    fetchUserDashboardData,
    totalUserCreditTransactions,
    totalUserDebitTransactions,
    totalUserTransactions,
    averageUserTransactions,
  } = useDashboardStore();

  useEffect(() => {
    fetchUserDashboardData();
  }, [fetchUserDashboardData]);

  const router = useRouter();
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <View>
      <Navbar/>
      <View style={styles.boxContainer}>
        <Text style={styles.sectionTitle}>Transactions Overview</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Total Transactions</Text>
              <Text style={styles.value}>{totalUserTransactions}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Total Credit Transactions</Text>
              <Text style={styles.value}>{totalUserCreditTransactions}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Total Debit Transactions</Text>
              <Text style={styles.value}>{totalUserDebitTransactions}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Avg Transactions</Text>
              <Text style={styles.value}>&#8358;{averageUserTransactions}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={() => navigation.navigate("addTransactions" as never)}
            >
              <Text style={styles.buttonText}>Add Transaction</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.historyButton]}
              onPress={() => navigation.navigate("Transactions" as never)}
            >
              <Text style={styles.buttonText}>Transaction History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.sectionTitle}>Transactions Trends</Text>
        <UserChart />
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton}  onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Userdashboard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 17,
  },
  boxContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#1a84b8", // Dark Red Gradient Theme
    borderRadius: 15,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "white",
    opacity: 0.7,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: "#1d4ed8",
  },
  historyButton: {
    backgroundColor: "#1d4ed8",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutContainer: { 
    marginTop: 50,
    marginLeft: 20, 
    width: "30%" 
  },
  logoutButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
});
