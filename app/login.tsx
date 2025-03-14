import { StyleSheet } from "react-native";
import React, { useState } from "react";

import Loginmodal from "./components/loginmodal";
import { useRouter } from "expo-router";

export default function Login() {
  const [modalVisible, setModalVisible] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setModalVisible(false);
    router.push("/");
  };

  return <Loginmodal visible={modalVisible} onClose={handleClose} />;
}

const styles = StyleSheet.create({});
