import { StyleSheet, TextProps, Text } from "react-native";
import React from "react";

export function Typography(props: TextProps) {
  return <Text style={styles.typography} {...props} />;
}

const styles = StyleSheet.create({
  typography: {
    color: "#fff",
  },
});
