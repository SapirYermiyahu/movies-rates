import { Endpoints } from "../constants/index";
import { requestHeaders } from "../config";
import getBaseURL from "../services/BaseURL";
import { APIService } from "../services/APIService";
import { APIMethod, APIResult } from "../constants";
import Cookies from "universal-cookie";
import { LoginRequest, ApiResponse } from "../types";
import { log } from "console";

const api = new APIService()
  .setHeaders(requestHeaders)
  .setMethod(APIMethod.POST);
const cookies = new Cookies();

export const login = async () => {
  const resToken = await getAuthToken()
  if (resToken.status === APIResult.SUCCESS && resToken.body) {
    cookies.set("Authorization", resToken.body, {
      path: "/",
      expires: new Date(Date.now() + 86400),
    }); // cookie expire after 1 day
    return resToken.body;
  }
  return null;
};

const getAuthToken: () => Promise<ApiResponse<string>> = async () => {
  const baseUrl: string = await getBaseURL("api");
  const body: LoginRequest = { username: process.env.REACT_APP_LOGIN_USER, password: process.env.REACT_APP_LOGIN_PASSWORD };
  return fetch(baseUrl + Endpoints.login, api.request(body))
    .then((res) =>
      res.json().then((data) => ({ status: res.status, body: data }))
    )
    .then((data) => {
      const response: ApiResponse<string> = data;
      return response;
    })
};

export const getUserExistingToken = (): string => {
  return cookies.get("Authorization");
};
