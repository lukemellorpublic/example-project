import {
  LOGIN,
  LOGGED_IN,
  CHANGE_LOGIN_FORM,
  LOGIN_FAILED,
  LOGGED_OUT,
  USER_UPDATED
} from "../actions/constants";

const initialState = {
  form: { username: "", password: "" },
  // TODO: change this to `errors : []` for consistency
  error: "",
  inProgress: false,
  loggedIn: false,
  currentUser: null,
  userName: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, inProgress: true };
    case LOGGED_IN:
      return {
        ...state,
        inProgress: false,
        loggedIn: true,
        currentUser: action.payload.user,
        userName: action.payload.data
      };
    case CHANGE_LOGIN_FORM:
      return { ...state, form: action.payload };
    case LOGIN_FAILED:
      return { ...state, error: action.payload, inProgress: false };
    case LOGGED_OUT:
      return { ...state, loggedIn: false, currentUser: null };
    case USER_UPDATED:
      return {
        ...state,
        userName: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
