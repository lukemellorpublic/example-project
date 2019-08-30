import { CHANGE_LOGIN_FORM, LOGIN, LOGOUT, UPDATE_USER } from "./constants";

export const login = () => ({ type: LOGIN });

export const loginChangeForm = form => ({
  type: CHANGE_LOGIN_FORM,
  payload: form
});

export const logout = () => ({ type: LOGOUT });

export const updateUser = form => ({ type: UPDATE_USER, payload: form });
