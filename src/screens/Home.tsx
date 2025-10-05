// File: screens/HomeScreen.tsx
import React from "react";
import { ScrollView, StyleSheet, StatusBar } from "react-native";
import Jumbotron from "../components/jumbotron";
import Services from "../components/card-services";
import Header from "../header/index"; 
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <Header />
      <ScrollView style={styles.scrollView}>
        <Jumbotron />
        <Services />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
});

export default HomeScreen;
