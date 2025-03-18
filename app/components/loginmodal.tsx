import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "expo-router";

const Loginmodal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const {login, loading, user } = useUserStore();
  const handleInputChange = (name: string, value: string) => {
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await login(formdata);
      onClose();
      if (user?.Role === "Admin") {
        router.push("/adminPage");
      } else {
        router.push("/userPage");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <ImageBackground
        source={require("../../assets/images/Shape.png")}
        resizeMode="stretch"
        style={styles.background}
      >
        <View style={styles.overlay} />
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={formdata.username}
            onChangeText={(value) => handleInputChange("username", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={formdata.password}
            onChangeText={(value) => handleInputChange("password", value)}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default Loginmodal;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(59, 130, 246, 0.5)",
  },
  modalContainer: {
    width: "85%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeText: {
    marginTop: 10,
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "red",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
});
