import { IMapState, IUsersState } from "@types";
import { Map } from "ol";

export const IS_DEV_MODE =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const BASE_USERS_API_URL = "https://randomuser.me/api";

export const INITIAL_MAP_STATE: IMapState = {
  map: new Map(),
  setMap: () => {},
  zoom: 0,
  setZoom: () => {},
  center: [0, 0],
  setCenter: () => {},
  userPoints: [],
  setUserPoints: () => {},
};

export const INITIAL_USERS_STATE: IUsersState = {
  users: [],
  setUsers: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  setUserSelected: () => {},
  selectedUsers: [],
};
