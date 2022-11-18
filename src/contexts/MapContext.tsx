import { INITIAL_MAP_STATE } from "@constants";
import { IMapState, IUserPoint } from "@types";
import { Coordinate } from "ol/coordinate";
import { useState } from "react";
import { createContext } from "react";
import { Map } from "ol";

export const MapContext = createContext<IMapState>(INITIAL_MAP_STATE);

/**
 * It's a React component that provides a map context to its children
 * @param  - `children`: The children of the component.
 */
export function MapProvider({ children }: { children: JSX.Element }) {
  const [map, setMap] = useState<Map>(new Map());
  const [zoom, setZoom] = useState(0);
  const [center, setCenter] = useState<Coordinate>([0, 0]);
  const [userPoints, setUserPoints] = useState<Array<IUserPoint>>([]);

  const _value: IMapState = {
    map,
    setMap,
    zoom,
    setZoom,
    center,
    setCenter,
    userPoints,
    setUserPoints,
  };

  return <MapContext.Provider value={_value}>{children}</MapContext.Provider>;
}
