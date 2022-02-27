import * as types from "../constant/actionTypes";

const getAuth = (token) => ({
  type: types.IS_AUTH,
  payload: token,
});

export const auth = (token) => (dispatch) => {
  dispatch(getAuth(token));
};
