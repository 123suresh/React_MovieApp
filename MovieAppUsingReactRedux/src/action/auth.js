import * as types from "../constant/actionTypes";

const getAuth = (token) => ({
  type: types.IS_AUTH,
  payload: token,
});

const handleLanguage = (language) => ({
  type: types.HANDLE_LANGUAGE_CHANGE,
  payload: language,
});

export const auth = (token) => (dispatch) => {
  dispatch(getAuth(token));
};

export const handleChangeLanguage = (language) => (dispatch) => {
  dispatch(handleLanguage(language));
};
