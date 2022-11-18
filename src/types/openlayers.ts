import { Coordinate } from "ol/coordinate";

export interface IUserPoint {
  position: Coordinate;
  isSelected?: boolean;
  refUser: string;
}
