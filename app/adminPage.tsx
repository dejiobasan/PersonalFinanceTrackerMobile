import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomTabs from "./components/bottomtabs";
import { useUserStore } from "@/stores/useUserStore";


const AdminPage = () => {
  const { user } = useUserStore();
  const isAdmin = user?.Role === "Admin";
  return <>{isAdmin && <BottomTabs isAdmin={true} />}</>;
};

export default AdminPage;

const styles = StyleSheet.create({});
