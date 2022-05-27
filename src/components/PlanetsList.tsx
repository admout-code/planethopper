import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, View, FlatList } from "react-native";
import { PlanetType } from "../entities/planet";
import { getPlanets } from "../services/fetchFunctions/getPlanets";
import {
  createFailResponse,
  isSuccessResponse,
  ResponseStatus,
} from "../services/responseHandlers";
import { useFetch } from "../services/useFetch";
import { ErrorPage } from "../ui-kit/ErrorPage";
import { LoadingScreen } from "../ui-kit/LoadingScreen";
import { Planet } from "./Planet";
import { PlannedTrips } from "./PlannedTrips";

export function PlanetsList() {
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedTrips, setSelectedTrips] = useState<
    Record<string, PlanetType>
  >({});

  const { data, loading, error, updateData, updateError } = useFetch(() =>
    getPlanets(page)
  );

  const isModalOpen = Boolean(Object.values(selectedTrips).length);

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

  const fetchMore = useCallback(async () => {
    setIsLoadingMore(true);
    try {
      const response = await getPlanets(page);
      if (isSuccessResponse(response)) {
        return updateData((prev) => ({
          ...response.data,
          results: [...(prev?.results ?? []), ...response.data.results],
        }));
      }
      updateError(response);
    } catch (_) {
      updateError(
        createFailResponse("There's an error while trying to load more.")
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, updateData, updateError]);

  const onEndReached = useCallback(() => {
    /* 
      Change page only if we're not 
      currently fetching more data and if we have next (obviously :P)
    */
    if (data?.next && !isLoadingMore) setPage((prev) => prev + 1);
  }, [data?.next, isLoadingMore]);

  useEffect(() => {
    /*
      We use page > 1 to prevent this useEffect run on initial load 
      together with useFetch
    */
    if (page > 1) fetchMore();
  }, [page, fetchMore]);

  if (error && error.status === ResponseStatus.FAIL) {
    return <ErrorPage message={error.data} />;
  }

  if (!data || loading) {
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
