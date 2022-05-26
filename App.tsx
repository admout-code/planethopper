import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { PlanetsList } from "./src/components/PlanetsList";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="cyan" barStyle="dark-content" />
      <PlanetsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#575757",
  },
});
