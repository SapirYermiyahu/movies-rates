import { Endpoints } from "../constants/index";
import { requestHeaders } from "../config";
import getBaseURL from "../services/BaseURL";
import { APIService } from "../services/APIService";
import { MoviesFromAPI, ApiResponse } from "../types";
import { getUserExistingToken } from "./login";

export const getMovies: () => Promise<
  ApiResponse<MoviesFromAPI[]> | null
> = async () => {
  const baseUrl = await getBaseURL("api");
  const token = await getUserExistingToken();
  if(token){
	const api = new APIService(token).setHeaders(requestHeaders);
  
	return fetch(baseUrl + Endpoints.get_movies, api.request())
		  .then(res =>  res.json().then(data => ({status: res.status, body: data})))
		  .then(data => {			
			const response: ApiResponse<MoviesFromAPI[]> = data;
			return response;
	}) 
  }
  return null
};
