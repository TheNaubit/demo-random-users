import { IUserPoint } from "@types";
import { Map } from "ol";
import { Coordinate } from "ol/coordinate";
import { IUser } from "./user";

export interface IMapState {
  map: Map;
  setMap: (newMap: Map) => void;
  zoom: number;
  setZoom: (newZoom: number) => void;
  center: Coordinate;
  setCenter: (newCenter: Coordinate) => void;
  userPoints: Array<IUserPoint>;
  setUserPoints: (newUserPoints: Array<IUserPoint>) => void;
}

export interface IUsersState {
  users: Array<IUser>;
  setUsers: (newUsers: Array<IUser>) => void;
  updateUser: (userEmail: string, newValue: IUser) => void;
  deleteUser: (userEmail: string) => void;
  setUserSelected: (userEmail: string | null) => void;
  selectedUsers: Array<IUser>;
}
