import React, { useEffect } from "react";
import { Stack } from "expo-router";
import "./global.css";
import Toast from "react-native-toast-message";
import { ActivityIndicator, View } from "react-native";
import { useUserStore } from "@/stores/useUserStore";

// const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const { user, checkingAuth, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth(); // Verify user session on app startup
  }, []);

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        {!user ? (
          <>
            <Stack.Screen name="register" />
            <Stack.Screen name="login" />
          </>
        ) : (
          <>
            {user?.Role === "Admin" ? (
              <>
                <Stack.Screen name="admindashboard" />
                <Stack.Screen name="userdashboard" />
              </>
            ) : (
              <>
                <Stack.Screen name="userdashboard" />
                <Stack.Screen name="admindashboard" />
              </>
            )}
          </>
        )}
      </Stack>
      <Toast />
    </>
  );
}
