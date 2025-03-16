import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TransactionsPage = () => {
  return (
    <View style={styles.container}>
      <Text>transactionsPage</Text>
    </View>
  );
};

export default TransactionsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
