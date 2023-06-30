import React, { useEffect, useState, useRef } from "react";
import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import Header from "./components/header";
import Table from "./components/table";
import RenderLineChart from "./components/chart";
import { getConnectionToHub } from "./services/HubConnection";
import { HubData, MoviesFromAPI } from "./types";
import { login, getUserExistingToken } from "./api/login";
import Loader from './components/common/loader'
import ErrorPage from './components/common/errorPage'
import "./App.css";
/* 
Description about component actions:
 The main component, holds the header, table and chart component.
 Pass data to and between the different components.
 First generates auth token, if succeed then create connection to hub and update the connection status
*/

function App() {
  const [connection, setConnection] = useState<HubConnection>();
  const [moviesVotes, setMoviesVotesData] = useState<HubData[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false);
  const [lastTimeReceivedData, setLastTimeReceivedData] = useState<string>("");
  const [moviesFromApi, setMoviesFromApi] = useState<MoviesFromAPI[]>([]);
  const latestMoviesData = useRef<HubData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  latestMoviesData.current = moviesVotes;

  useEffect(() => {
    setAuthToken();
  }, []);

  /* If connection to hub exist and connected => start listening to hub and set connection status */
  useEffect(() => {
	if(connection){				
		if (connection.state === HubConnectionState.Disconnected) {
			setConnectionStatus(false)
		}
	}
	collectHubData();
  }, [connection]);

  /* 
 	Function that checks the auth token,
	if doesn't exists in cookies => get a token by post API call to /login
  */
  const setAuthToken = async () => {
    const existingToken: string = getUserExistingToken();
    let newToken;
    if (!existingToken) {
      newToken = await login();
    }
    if (newToken || existingToken) {
      setIsLoggedIn(true);
	  setIsError(false)
      newToken ? buildConnection(newToken.token) : buildConnection(existingToken)
    }else{ // user cant logged in
		setIsError(true)
	}
  };

  /* 
  	Function to create the connection to hub for the 1st time
  */
  const buildConnection = async (token: string) => {
    const connection = await getConnectionToHub(token);	
    setConnection(connection);
  };

  /* 
 	Function to start the connection to hub and update the relevant variables in case of getting data
  */
  const collectHubData = async () => {
      	if (connection && isLoggedIn) {
             connection.start()
                .then(result => {
					if (connection.state === HubConnectionState.Connected) {
						setConnectionStatus(true)
					}					
                    connection.on('DataReceived', data => {	
                        setMoviesVotesData(data);  
						setLastTimeReceivedData(new Date().toLocaleString())
                    });
                })
                .catch(e => {
					console.log(e)
					setIsError(true)
				});
        } 
  }; 

  /* 
 	Function to get the movies data from table component
  */
  const setMoviesApiData = (moviesData: MoviesFromAPI[]): void => {
    setMoviesFromApi(moviesData);
  };

  return (
    <div className="App">
	{isLoading && <Loader></Loader>}
	{isError ? <ErrorPage></ErrorPage> :
	<React.Fragment>
      <Header
        connectionStatus={connectionStatus}
        lastTimeReceivedData={lastTimeReceivedData}
      ></Header>
      <Table
        moviesVotes={moviesVotes}
        setMoviesApiData={setMoviesApiData}
		setIsError={setIsError}
		setIsLoading={setIsLoading}
      ></Table>
      <RenderLineChart
        moviesApiData={moviesFromApi}
        moviesVotes={moviesVotes}
      ></RenderLineChart>
	</React.Fragment>
    }
	</div>
  );


}

export default App;
