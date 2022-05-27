import { PlanetType } from "../entities/planet";
import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Typography } from "../ui-kit/Typography";
import { getRandomImage } from "../../assets/planethopperImages";
import { Button } from "../ui-kit/Button";

type PlanetFC = {
  planet: PlanetType;
  onPress: (planet: PlanetType) => void;
  isHighlighted: boolean;
};

const thousandsWithCommas = (value: string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function Planet({ planet, onPress, isHighlighted }: PlanetFC) {
  const imageRef = useRef(getRandomImage());

  return (
    <Button
      onPress={() => onPress(planet)}
      style={{
        ...styles.root,
        backgroundColor: isHighlighted ? "#f2ebf5" : "transparent",
      }}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: imageRef.current }} />
        <View style={styles.content}>
          <Typography style={styles.name}>{planet.name}</Typography>
          <Typography>Climate: {planet.climate}</Typography>
          <Typography numberOfLines={2} ellipsizeMode="head">
            Terrain: {planet.terrain} {planet.terrain}
          </Typography>
          <Typography>
            Population: {thousandsWithCommas(planet.population)}
          </Typography>
        </View>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 8,
    borderRadius: 8,
  },
  container: {
    flexDirection: "row",
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  content: {
    width: 300,
    paddingHorizontal: 8,
    justifyContent: "space-around",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
});
