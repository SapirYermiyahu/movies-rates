import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import getBaseURL from "./BaseURL";

/* 
	Create connection to hub
*/
export async function getConnectionToHub(
  token: string
): Promise<HubConnection> {
  const hubUrl = await getBaseURL("hub");

  const newConnection = new HubConnectionBuilder()
    .withUrl(hubUrl, { accessTokenFactory: () => token }) // I used accessTokenFactory because that's the way to do that with JS according mucrosoft docs: https://learn.microsoft.com/en-us/aspnet/core/signalr/authn-and-authz?view=aspnetcore-7.0
    .withAutomaticReconnect()
    .build();

  return newConnection;
}
