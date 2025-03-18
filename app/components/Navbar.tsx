import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useUserStore } from "@/stores/useUserStore";
import { SafeAreaView } from "react-native-safe-area-context";

const Navbar = () => {
  const { user } = useUserStore();

  const userName = user?.Username || "User";
  const profileImage = user?.Image || "No image found";
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {userName}</Text>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      </View>
    </SafeAreaView>
  );
};

export default Navbar;

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
});
