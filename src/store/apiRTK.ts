import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie } from "../interfaces/IMovie";
import { IDetailsMovie } from "../interfaces/IDetailsMovie";

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org",
  }),
  endpoints: (builder) => ({
    getMoviesByPage: builder.query<IMovie, string>({
      query: (page) =>
        `3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
    }),
    getDetailsMovieByID: builder.query<IDetailsMovie, string>({
      query: (ID) => `3/movie/${ID}?api_key=${process.env.REACT_APP_API_KEY}`,
    }),
    getMoviesBySearch: builder.query<IMovie, string>({
      query: (movieSearch) =>
        `3/search/movie?query=${movieSearch}&api_key=${process.env.REACT_APP_API_KEY}`,
    }),
  }),
});
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMoviesByPageQuery,
  useGetDetailsMovieByIDQuery,
  useGetMoviesBySearchQuery,
} = moviesApi;
