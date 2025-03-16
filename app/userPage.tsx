import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomTabs from "./components/bottomtabs";
import { useUserStore } from "@/stores/useUserStore";


const UserPage = () => {
  const { user } = useUserStore();
  const isAdmin = user?.Role === "Admin";
  return <>{!isAdmin && <BottomTabs isAdmin={false} />}</>;
};

export default UserPage;

const styles = StyleSheet.create({});
