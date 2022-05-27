import React from "react";
import { ViewProps, View, StyleSheet } from "react-native";

export function Centered(props: ViewProps) {
  return <View style={styles.root} {...props} />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
