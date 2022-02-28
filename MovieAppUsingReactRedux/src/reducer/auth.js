import * as types from "../constant/actionTypes";
const INITIAL_STATE = {
  // isAuthenticated: localStorage.getItem("token") ? "true" : "",
  isAuthenticated: "",
};
function Auth(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    // case types.IS_AUTH:
    //   payload
    //     ? localStorage.setItem("token", payload)
    //     : localStorage.removeItem("token");
    //   return { ...state, isAuthenticated: payload };
    case types.IS_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case types.HANDLE_LANGUAGE_CHANGE:
      return {
        ...state,
        selectLanguage: action.payload,
      };
    default:
      return state;
  }
}

export default Auth;
