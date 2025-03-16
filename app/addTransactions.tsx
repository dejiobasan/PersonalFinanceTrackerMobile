import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddTransactions = () => {
  return (
    <View style={styles.container}>
      <Text>addTransactions</Text>
    </View>
  )
}

export default AddTransactions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})