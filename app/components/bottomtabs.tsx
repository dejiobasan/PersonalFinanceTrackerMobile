import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddTransactions from "../addTransactions";
import ContactAdmin from "../contactAdmin";
import TransactionsPage from "../transactionsPage";
import Userdashboard from "../userdashboard";
import Admindashboard from "../admindashboard";
import ViewAllTransactions from "../viewAllTransactions";

const Tab = createBottomTabNavigator();

const BottomTabs = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconMap: Record<string, string> = {
            Dashboard: "dashboard",
            Transactions: "attach-money",
            addTransactions: "add-circle",
            ContactAdmin: "contact-support",
            AllTransactions: "attach-money",
          };
          return (
            <Icon
              name={iconMap[route.name] || "help"}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#1d4ed8",
          paddingBottom: 5,
          paddingTop: 5,
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      })}
    >
      {isAdmin ? (
        <Tab.Screen name="Dashboard" component={Admindashboard} />
      ) : (
        <Tab.Screen name="Dashboard" component={Userdashboard} />
      )}
      <Tab.Screen name="Transactions" component={TransactionsPage} />
      <Tab.Screen name="addTransactions" component={AddTransactions} />

      {isAdmin ? (
        <Tab.Screen
          name="AllTransactions"
          component={ViewAllTransactions}
        />
      ) : (
        <Tab.Screen name="ContactAdmin" component={ContactAdmin} />
      )}
    </Tab.Navigator>
  );
};

export default BottomTabs;
