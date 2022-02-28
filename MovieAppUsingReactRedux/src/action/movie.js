import * as types from "../constant/actionTypes";
import { deleteRequest, getRequest, postRequest } from "../services/apiCall";

const getMovieList = (movieList) => ({
  type: types.GET_MOVIE_LIST,
  payload: movieList,
});

const getWatchList = (watchList) => ({
  type: types.GET_WATCH_LIST,
  payload: watchList,
});

const addToWatchList = (watchList) => ({
  type: types.ADD_TO_WATCH_LIST,
  payload: watchList,
});

const deleteWatchList = (delWatchListId) => ({
  type: types.DELETE_WATCH_LIST,
  payload: delWatchListId,
});

const handleLanguage = (language) => ({
  type: types.HANDLE_LANGUAGE_CHANGE,
  payload: language,
});

export const loadMovieList = () => async (dispatch) => {
  try {
    const response = await getRequest("movieLists");
    dispatch(getMovieList(response.data));
  } catch (error) {
    console.log("error");
  }
};

export const loadWatchList = () => async (dispatch) => {
  try {
    const response = await getRequest("watchList");
    dispatch(getWatchList(response.data));
  } catch (error) {
    console.log("error");
  }
};

export const addWatchList = (dataToWatchList) => async (dispatch) => {
  try {
    await postRequest(dataToWatchList, "watchList");
    dispatch(addToWatchList(dataToWatchList));
  } catch (error) {
    console.log("error");
  }
};

export const deleteFromWatchList = (delWatchListId) => async (dispatch) => {
  try {
    await deleteRequest(delWatchListId, "watchList");
    dispatch(deleteWatchList(delWatchListId));
  } catch (error) {
    console.log("error");
  }
};

export const handleChangeLanguage = (language) => (dispatch) => {
  dispatch(handleLanguage(language));
};
