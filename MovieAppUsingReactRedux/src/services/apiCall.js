import axios from "axios";

export const getRequest = (url) => {
  const getMovieList = axios.get(`${process.env.REACT_APP_API}/${url}`);
  return getMovieList;
};

export const postRequest = (watchListData, url) => {
  axios.post(`${process.env.REACT_APP_API}/${url}`, watchListData);
};

export const deleteRequest = (delWatchListId, url) => {
  axios.delete(`${process.env.REACT_APP_API}/${url}/${delWatchListId}`);
};
