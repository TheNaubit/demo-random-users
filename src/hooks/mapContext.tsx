import { useContext } from "react";
import { useLogger } from "@hooks/logger";
import { MapContext } from "@contexts/MapContext";

/**
 * It returns the map and setMap functions from the MapContext
 */
export function useMap() {
  const { error } = useLogger({ tag: "useMap" });
  const context = useContext(MapContext);

  if (!context) {
    const _err = new Error("useMap must be used within MapProvider");
    error(_err);
    throw _err;
  }

  return {
    map: context.map,
    setMap: context.setMap,
  };
}

/**
 * It returns an object with two properties, `zoom` and `setZoom`, which are the current zoom level and
 * a function to set the zoom level, respectively
 * @returns An object with two properties: zoom and setZoom.
 */
export function useMapZoom() {
  const { error } = useLogger({ tag: "useMapZoom" });
  const context = useContext(MapContext);

  if (!context) {
    const _err = new Error("useMapZoom must be used within MapProvider");
    error(_err);
    throw _err;
  }

  return {
    zoom: context.zoom,
    setZoom: context.setZoom,
  };
}

/**
 * It returns an object with two properties, center and setCenter, which are the current center of the
 * map and a function to set the center of the map, respectively
 * @returns An object with two properties: center and setCenter.
 */
export function useMapCenter() {
  const { error } = useLogger({ tag: "useMapCenter" });
  const context = useContext(MapContext);

  if (!context) {
    const _err = new Error("useMapCenter must be used within MapProvider");
    error(_err);
    throw _err;
  }

  return {
    center: context.center,
    setCenter: context.setCenter,
  };
}

/**
 * It returns an object with two properties, userPoints and setUserPoints, which are the same as the
 * userPoints and setUserPoints properties of the MapContext object
 * @returns An object with two properties: userPoints and setUserPoints.
 */
export function useMapUserPoints() {
  const { error } = useLogger({ tag: "useMapUserPoints" });
  const context = useContext(MapContext);

  if (!context) {
    const _err = new Error("useMapUserPoints must be used within MapProvider");
    error(_err);
    throw _err;
  }

  return {
    userPoints: context.userPoints,
    setUserPoints: context.setUserPoints,
  };
}
