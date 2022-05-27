import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { PlanetsList } from "./src/components/PlanetsList";
import { Typography } from "./src/ui-kit/Typography";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f2ebf5" barStyle="dark-content" />
      <Typography style={styles.title}>Planethopper</Typography>
      <PlanetsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    fontFamily: "monospace",
  }
});
