import {
  Text,
  ImageBackground,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useUserStore } from "@/stores/useUserStore";

const Registermodal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    number: "",
    image: "",
  });

  const { register, loading } = useUserStore();

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickImage = async (fromCamera: boolean) => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || galleryStatus !== "granted") {
      Alert.alert(
        "Permissions Required",
        "Please grant camera and gallery access to upload an image."
      );
      return;
    }

    const result = await (fromCamera
      ? ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        })
      : ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        }));

    if (!result.canceled) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    try {
      await register(formData);
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: "",
        image: "",
      });
      onClose();
      router.push("/login");
    } catch (error) {
      console.error("Registration failed", error);
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
          <Text style={styles.title}>Register</Text>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
          />

          {/* Username Input */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={formData.username}
            onChangeText={(value) => handleInputChange("username", value)}
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            secureTextEntry
          />

          {/* Confirm Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            value={formData.confirmPassword}
            onChangeText={(value) =>
              handleInputChange("confirmPassword", value)
            }
            secureTextEntry
          />

          {/* Phone Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            value={formData.number}
            onChangeText={(value) => handleInputChange("number", value)}
            keyboardType="numeric"
          />

          {/* Image Upload Buttons */}
          <View style={styles.imageUploadContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImage(false)}
            >
              <Text style={styles.uploadText}>📁 Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImage(true)}
            >
              <Text style={styles.uploadText}>📷 Take a Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Show selected image preview */}
          {formData.image ? (
            <Image
              source={{ uri: formData.image }}
              style={styles.imagePreview}
            />
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
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

export default Registermodal;

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
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  imageUploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  uploadButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#1E3A8A",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 10,
  },
  uploadText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  closeButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "red",
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
});
