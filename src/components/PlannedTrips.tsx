import React from "react";
import { View, StyleSheet } from "react-native";
import { PlanetType } from "../entities/planet";
import { Button } from "../ui-kit/Button";
import { Typography } from "../ui-kit/Typography";

type PlannedTripsModalFC = {
  trips: PlanetType[];
  visible: boolean;
  onClear: () => void;
};

export function PlannedTrips({ visible, trips, onClear }: PlannedTripsModalFC) {
  const selectedTrips = trips.map((planet) => planet.name).join(" > ");
  return (
    <View style={{ ...styles.root, display: visible ? "flex" : "none" }}>
      <View>
        <Typography style={styles.title}>My trip</Typography>
        <Typography style={styles.text}>{selectedTrips}</Typography>
      </View>
      <View style={styles.clearContainer}>
        <Button onPress={onClear}>
          <Typography style={styles.clearButton}>Clear</Typography>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 100,
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#000",
    padding: 8,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
  },
  text: {
    fontWeight: "400",
    fontSize: 15,
  },
  clearContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    color: "#b80404",
    fontWeight: "500",
    fontSize: 16,
  },
});
