import * as types from "../constant/actionTypes";

const initialState = {
  movieList: [],
  watchList: [],
};

const movieInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MOVIE_LIST:
      return {
        ...state,
        movieList: action.payload,
      };
    case types.GET_WATCH_LIST:
      return {
        ...state,
        watchList: action.payload,
      };
    case types.ADD_TO_WATCH_LIST:
      return {
        ...state,
        watchList: [...state.watchList, action.payload],
      };
    case types.DELETE_WATCH_LIST:
      const watchListAfterDel = state.watchList.filter(
        (el) => el.id !== action.payload
      );
      return {
        ...state,
        watchList: watchListAfterDel,
      };
    default:
      return state;
  }
};

export default movieInfo;
