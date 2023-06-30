export type BaseUrlTypes = 'api' | 'hub'

export interface HubData {
	generatedTime: string,
	itemId: number,
	itemCount: number
}

export type ApiMethod = "POST" | "GET";

export type KeyValue<T, U> = {
	key: T,
	value: U,
};

export interface MoviesFromAPI {
	id: number,
	description: string,
	votes: number,
	lastUpdated: string
}

export interface MoviesWithVotes {
	id: number,
	description: string,
	votes: number,
	lastUpdated: string
}

export interface LoginRequest {
	username: string | undefined,
	password: string | undefined
}

export type ApiResponse<T> = {
	status: number,
	body: T,
};

export type ChartDatatType = {
	name: string,
	votes: number
}

export type SumVotes = {
	[key: number]: {votes: number, lastUpdated: string},
}

export type LoginResponse = {
	token: string
}
  