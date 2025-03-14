import {
  StyleSheet,
  
} from "react-native";
import React, { useState } from "react";
import Registermodal from "./components/registermodal";
import { useRouter } from "expo-router";


const Register = () => {
  const [modalVisible, setModalVisible] = useState(true); // Automatically show modal
  const router = useRouter();
  const handleClose = () => {
    setModalVisible(false);
    router.push("/");
  };

  return (
    <Registermodal visible={modalVisible} onClose={handleClose} />
  );
};

export default Register;

const styles = StyleSheet.create({});
