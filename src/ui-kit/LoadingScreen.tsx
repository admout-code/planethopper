import React from "react";
import { ActivityIndicator } from "react-native";
import { Centered } from "./Centered";

export function LoadingScreen() {
  return (
    <Centered>
      <ActivityIndicator color="#83758a" size="large" />
    </Centered>
  );
}
