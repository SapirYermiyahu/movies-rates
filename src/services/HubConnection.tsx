import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import * as signalR from '@microsoft/signalr';
import getBaseURL from "./BaseURL";
import { log } from "console";

/* 
	Create connection to hub
*/
export async function getConnectionToHub(
  token: string
): Promise<HubConnection> {
  const hubUrl = await getBaseURL("hub");
  const newConnection = new HubConnectionBuilder()
  	.configureLogging(signalR.LogLevel.Debug)
    .withUrl(hubUrl, { accessTokenFactory: () => token, withCredentials: false }) // I used accessTokenFactory because that's the way to do that with JS according mucrosoft docs: https://learn.microsoft.com/en-us/aspnet/core/signalr/authn-and-authz?view=aspnetcore-7.0
    .build();
  return newConnection;
}
