import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Navbar from "./components/Navbar";
// import emailjs from "@emailjs/browser";

const ContactAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setLoading(true);

    // try {
    //   await emailjs.send(
    //     "your_service_id", // Replace with EmailJS Service ID
    //     "your_template_id", // Replace with EmailJS Template ID
    //     {
    //       user_name: formData.name,
    //       user_email: formData.email,
    //       message: formData.message,
    //     },
    //     "your_public_key" // Replace with EmailJS Public Key
    //   );

    //   Alert.alert("Success", "Email sent successfully!");
    //   setFormData({ name: "", email: "", message: "" });
    // } catch (error) {
    //   Alert.alert("Error", "Failed to send email. Try again.");
    //   console.error("EmailJS Error:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <View>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.title}>Contact Admin</Text>
        <Text style={styles.subtitle}>
          Having issues with a transaction? Contact the admin for assistance.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the issue"
          value={formData.message}
          onChangeText={(text) => handleChange("message", text)}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send Message</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ContactAdmin;
