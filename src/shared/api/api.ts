import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Game {
  gameID: string;
  gameName: string;
  gameTypeID: string;
  platform: string;
  technology: string;
}

export interface GamesResponse {
  result: Game[];
  status: number;
  error_message: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getGames: builder.query<Game[], void>({
      query: () => "pragmatic/game/list?partner_name=belparyaj",
      transformResponse: (response: GamesResponse) => response.result,
    }),
  }),
});

export const { useGetGamesQuery } = api;
