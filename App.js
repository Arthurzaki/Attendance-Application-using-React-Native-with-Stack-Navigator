import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Home from './pages/Home'; // Memanggil file Home.js yang di folder yang sama

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});