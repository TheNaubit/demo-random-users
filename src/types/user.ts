export type Gender = "male" | "female";

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Location {
  street: {
    name: string;
    number: number;
  };
  city: string;
  state: string;
  postcode: string;
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface Dob {
  date: Date;
  age: number;
}

export interface ID {
  name: string;
  value: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface IUser {
  gender: Gender;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Dob;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string;
  isSelected?: boolean;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface IRandomUserResponse {
  results: Array<IUser>;
  info: Info;
}
