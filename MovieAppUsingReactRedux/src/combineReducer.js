import React from "react";
import { combineReducers } from "redux";
import Auth from "./reducer/auth";
import movieInfo from "./reducer/movie";

const rootReducer = combineReducers({
  auth: Auth,
  info: movieInfo,
});

export default rootReducer;
