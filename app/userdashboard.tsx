import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useRouter } from "expo-router";
import UserChart from "./components/userChart";

const Userdashboard = () => {
  const { user, logout } = useUserStore();
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

  const userName = user?.Username || "User";
  const profileImage = user?.Image || "No image found";

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <View>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi, {userName}</Text>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </View>
      </SafeAreaView>
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
              onPress={() => router.navigate("/addTransactions")}
            >
              <Text style={styles.buttonText}>Add Transaction</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.historyButton]}
              onPress={() => router.navigate("/transactionsPage")}
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
  safeContainer: {
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
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
