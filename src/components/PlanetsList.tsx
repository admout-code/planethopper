import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, ActivityIndicator, View, FlatList } from "react-native";
import { PlanetType } from "../entities/planet";
import { getPlanets } from "../services/fetchFunctions/getPlanets";
import { ResponseStatus } from "../services/responseHandlers";
import { useFetch } from "../services/useFetch";
import { ErrorPage } from "../ui-kit/ErrorPage";
import { LoadingScreen } from "../ui-kit/LoadingScreen";
import { Planet } from "./Planet";
import { PlannedTrips } from "./PlannedTrips";

export function PlanetsList() {
  const [page, setPage] = useState(1);
  const [selectedTrips, setSelectedTrips] = useState<
    Record<string, PlanetType>
  >({});

  const fetchPlanets = useCallback(() => getPlanets(page), [page]);
  const { data, loading, error } = useFetch(
    fetchPlanets,
    (setData, fetchResult) =>
      setData((prev) => ({
        ...fetchResult.data,
        results: [...(prev?.results ?? []), ...fetchResult.data.results],
      }))
  );

  const isModalOpen = Boolean(Object.values(selectedTrips).length);
  const isLoadingMore = useMemo(() => loading && page > 1, [loading, page]);

  const handlePlanetPress = useCallback(
    (planet: PlanetType) => {
      if (Object.values(selectedTrips).length >= 5) return;
      setSelectedTrips((prev) => ({
        ...prev,
        [`${planet.name}${planet.diameter}`]: planet,
      }));
    },
    [selectedTrips]
  );

  const onEndReached = useCallback(() => {
    if (data?.next && !isLoadingMore) {
      setPage((prev) => prev + 1);
    }
  }, [data?.next, isLoadingMore]);

  if (error && error.status === ResponseStatus.FAIL) {
    return <ErrorPage message={error.data} />;
  }

  if (!data || (loading && !isLoadingMore)) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        onEndReached={onEndReached}
        data={data.results}
        renderItem={({ item: planet }) => (
          <Planet
            onPress={handlePlanetPress}
            key={`${planet.name}${planet.diameter}`}
            isHighlighted={Boolean(
              selectedTrips[`${planet.name}${planet.diameter}`]
            )}
            planet={planet}
          />
        )}
      />
      {isLoadingMore && (
        <View style={styles.loadingMoreView}>
          <ActivityIndicator color="#83758a" size="large" />
        </View>
      )}
      <PlannedTrips
        onClear={() => setSelectedTrips({})}
        trips={Object.values(selectedTrips)}
        visible={isModalOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingMoreView: {
    backgroundColor: "transparent",
  },
});
