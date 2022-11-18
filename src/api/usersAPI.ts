import { BASE_USERS_API_URL } from "@constants";
import axios from "axios";
import { IRandomUserResponse } from "types/user";
import urlcat from "urlcat";

/**
 * It takes an object with a property called `results` that is a number (the number of random users to
 * get from the server), and returns a promise that
 * resolves to an object with a property called `results` that is an array of objects (IUser objects)
 * @param  - results - the number of users to return
 * @returns An object with a property called data that is of type IRandomUserResponse
 */
export function getRandomUsers({ results = 1 }: { results?: number }) {
  const queryURL = urlcat(BASE_USERS_API_URL, `/`, { results });

  return axios.get(queryURL).then((res) => res.data as IRandomUserResponse);
}
