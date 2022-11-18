import { useEffect, useMemo, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import "../../../node_modules/ol/ol.css";
import { Box } from "@mui/material";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

import markerImage from "@assets/marker.png";
import markerActiveImage from "@assets/marker_active.png";

import { IUserPoint } from "@types";
import {
  useMap,
  useMapCenter,
  useMapUserPoints,
  useMapZoom,
} from "@hooks/mapContext";

/**
 * It creates a map, sets it in the context, and updates it when the context changes
 * @param  - `children`: the (optional) children JSX Elements.
 * @returns A box with a map inside of it.
 */
export const OLMap = ({ children }: { children?: JSX.Element }) => {
  const { map, setMap } = useMap();
  const { userPoints: mapUserPoints } = useMapUserPoints();
  const { zoom: mapZoom } = useMapZoom();
  const { center: mapCenter } = useMapCenter();

  const mapId = useRef();

  /* A memoized version of the selected user points. */
  const selectedUserPoints: Array<IUserPoint> = useMemo(
    () => mapUserPoints.filter((mapUserPoint) => mapUserPoint.isSelected),
    [mapUserPoints]
  );

  /* A memoized version of the non-selected user points. */
  const nonSelectedUserPoints: Array<IUserPoint> = useMemo(
    () => mapUserPoints.filter((mapUserPoint) => !mapUserPoint.isSelected),
    [mapUserPoints]
  );

  /* An effect to animate zoom and center changes in the map. */
  useEffect(() => {
    map.getView().animate({
      zoom: mapZoom,
      center: fromLonLat(mapCenter),
      duration: 500,
    });
  }, [mapZoom, mapCenter, map]);

  /** An effect somewhat tricky to update the map vector points based on the
   * updated user points in a performant way (avoiding full re-renders when possible
   * by updating only the modified points). */
  useEffect(() => {
    if (map.getAllLayers().length < 3) return;

    const _layers = map.getAllLayers();

    const selectedUsersLayerSource = (
      _layers[1] as VectorLayer<VectorSource<Point>>
    ).getSource();

    selectedUsersLayerSource?.clear();
    selectedUsersLayerSource?.addFeatures(
      selectedUserPoints.map(
        (point) =>
          new Feature({
            geometry: new Point(fromLonLat(point.position)),
          })
      )
    );
    selectedUsersLayerSource?.changed();

    const nonSelectedUsersLayerSource = (
      _layers[2] as VectorLayer<VectorSource<Point>>
    ).getSource();
    nonSelectedUsersLayerSource?.clear();
    nonSelectedUsersLayerSource?.addFeatures(
      nonSelectedUserPoints.map(
        (point) =>
          new Feature({
            geometry: new Point(fromLonLat(point.position)),
          })
      )
    );
    nonSelectedUsersLayerSource?.changed();
  }, [selectedUserPoints, nonSelectedUserPoints, map]);

  /** This is the effect that creates the map var and sets it in the context.
   * It will be triggered only if the context's map is null, to avoid re-renders
   * and other issues.
   */
  useEffect(() => {
    const theMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [],
          }),
          style: new Style({
            image: new Icon({
              scale: 0.3,
              anchor: [0.5, 0],
              anchorOrigin: "bottom-left",
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: markerActiveImage,
            }),
          }),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [],
          }),
          style: new Style({
            image: new Icon({
              scale: 0.3,
              anchor: [0.5, 0],
              opacity: 1,
              anchorOrigin: "bottom-left",
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: markerImage,
            }),
          }),
        }),
      ],
      view: new View({
        center: mapCenter,
        zoom: mapZoom,
      }),
    });
    theMap.setTarget(mapId.current);
    setMap(theMap);

    return () => {
      if (!theMap) return;
      theMap.setTarget(undefined);
      setMap(new Map());
    };
    // We disable here the eslint rule for exhaustive-deps since we only want this effect to be triggered
    // when the component is mounted for the first time. So even if the linter recommends to add some
    // dependencies to the useEffect, we don't really want to do it. And since I don't like to have useless
    // warnings, we disable the rule for that line.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box ref={mapId} width="100%" height="100vh">
      {children}
    </Box>
  );
};
