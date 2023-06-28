import React, { useEffect, useState } from "react";
import { HubData, MoviesFromAPI, MoviesWithVotes, SumVotes } from "../types";
import { getMovies } from "../api/movies";
import { APIResult } from "../constants/index";

type TableProps = {
  moviesVotes: HubData[]
  setMoviesApiData: (moviesData: MoviesFromAPI[]) => void
  setIsError: (isError: boolean) => void
  setIsLoading: (isLoading: boolean) => void
};

const Table = (props: TableProps) => {
  const [moviesFromApi, setMoviesFromAPI] = useState<MoviesFromAPI[]>([]);
  const [moviesWithVotes, setMoviesWithVotes] = useState<MoviesWithVotes[]>([]);
  const [sumVotesObj, setSumVotesObj] = useState<SumVotes>({}); // to sum new votes to previous votes we got from hub

  useEffect(() => {	
    getMoviesData();
  }, []);

  /* 
 	Get movies data from API 
	In case we are not getting succesful status show error page
  */
  const getMoviesData = async () => {	
    const res = await getMovies();		
	if(res){
		if (res.status === APIResult.SUCCESS) {
			setMoviesFromAPI(res.body);
			props.setMoviesApiData(res.body);
			props.setIsLoading(false)
		  }else{
			  props.setIsError(true)
		  }
	}else{
		props.setIsError(true)
		props.setIsLoading(false)
	}
  };

  /* 
 	Runs updateMoviesVotes function to re calculate the votes each time we are getting more data from hub/movies list changes
  */
  useEffect(() => {
    updateMoviesVotes();	
  }, [props.moviesVotes, moviesFromApi]);

  /* 
 	Add movies votes to the last movies data
  */
  const updateMoviesVotes = async () => {
    const sumVotesObj = await sumVotes();
    if (moviesFromApi.length && Object.keys(sumVotesObj).length != 0) {
      for (let i = 0; i < moviesFromApi.length; i++) {
        if (sumVotesObj.hasOwnProperty(moviesFromApi[i].id)) {
          moviesFromApi[i].votes += sumVotesObj[moviesFromApi[i].id].votes;
          moviesFromApi[i].lastUpdated =
            sumVotesObj[moviesFromApi[i].id].lastUpdated;
        }
      }
      setMoviesWithVotes(moviesFromApi);
    }
  };

  /* 
  Re calculate the movies votes, runs in case we got new data from hub
  @return Object => the object property is the movie id, the value is an object with votes and last updated data
  */
  const sumVotes = () => {
    for (let i = 0; i < props.moviesVotes.length; i++) {
      if (sumVotesObj.hasOwnProperty(props.moviesVotes[i].itemId)) { // case already added movie to sumVotesObj
        sumVotesObj[props.moviesVotes[i].itemId].votes +=
          props.moviesVotes[i].itemCount;
        if (sumVotesObj[props.moviesVotes[i].itemId].lastUpdated <  // case current last updated is bigger that the value we already have, we'll update the value to newest
          props.moviesVotes[i].generatedTime) {
          sumVotesObj[props.moviesVotes[i].itemId].lastUpdated =
            props.moviesVotes[i].generatedTime;
        }
      } else {														// case we don't have yet data about the movie votes in the obj
        sumVotesObj[props.moviesVotes[i].itemId] = {
          votes: props.moviesVotes[i].itemCount,
          lastUpdated: new Date(
            props.moviesVotes[i].generatedTime
          ).toUTCString(),
        };
      }
	  setSumVotesObj(sumVotesObj)
    }
    return sumVotesObj;
  };

  return (
    <div className="p-10">
      <h1 className="text-blue-950 font-semibold text-2xl text-left">
        Welcome to movies rates system!
      </h1>
      <p className="text-blue-950 font-semibold text-lg text-left">
        Here are votes we collected for you, we hope it'll make your choice
        easier.
      </p>
      <table className="min-w-full divide-y divide-gray-200 mb-10 mt-10">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="py-2 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Movie ID
            </th>
            <th className="py-2 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Movie Description
            </th>
            <th className="py-2 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Votes
            </th>
            <th className="py-2 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-left">
          {moviesWithVotes.length
            ? moviesWithVotes.map((movie) => (
                <tr key={movie.id}>
                  <td className="py-2 px-4 whitespace-nowrap">{movie.id}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{movie.description}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{movie.votes}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{movie.lastUpdated}</td>
                </tr>
              ))
            : moviesFromApi.length && moviesFromApi.map((movie) => (
                <tr key={movie.id}>
                  <td className="py-2 px-4 whitespace-nowrap">{movie.id}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{movie.description}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
