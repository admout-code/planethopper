import React from "react";
import { StyleSheet } from "react-native";
import { Centered } from "./Centered";
import { Typography } from "./Typography";

type ErrorPageFC = {
  message: string;
};

export function ErrorPage({ message }: ErrorPageFC) {
  return (
    <Centered>
      <Typography style={styles.errorText}>{message}</Typography>
    </Centered>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "#b80404",
    fontWeight: "500",
    fontSize: 16,
  },
});
