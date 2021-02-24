import * as types from "./actionTypes";

export const getMovies = () => ({
  type: types.GET_MOVIES,
});

export const getMoviesSuccess = (json) => ({
  type: types.GET_MOVIES_SUCCESS,
  payload: json,
});

export const getMoviesFailure = (error) => ({
  type: types.GET_MOVIES_FAILURE,
  payload: error,
});

export const getMovie = () => ({
  type: types.GET_SINGLE_MOVIE
});

export const getMovieSuccess = (json) => ({
  type: types.GET_SINGLE_MOVIE_SUCCESS,
  payload: json
});

export const getMovieFailure = (error) => ({
  type: types.GET_SINGLE_MOVIE_FAILURE,
  payload: error
});

export const toggleFavorite = (id) => ({
  type: types.TOGGLE_FAVORITE,
  payload: id
});