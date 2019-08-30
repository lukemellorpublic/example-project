import {
  LOAD_USERS,
  SAVE_USER,
  CHANGE_USER_FORM,
  USER_RESET_FORM,
  EDIT_USER,
  DELETE_USER,
  CREATE_USER_FORM,
  CONFIRM_USER,
  CREATE_COMPLETE
} from "./constants";

export const loadUsers = () => ({ type: LOAD_USERS });

export const editUser = id => ({ type: EDIT_USER, payload: id });

export const deleteUser = id => ({ type: DELETE_USER, payload: id });

export const createUser = form => ({ type: SAVE_USER, payload: form });

export const saveUser = form => ({ type: SAVE_USER, payload: form });

export const createUserComplete = () => ({ type: CREATE_COMPLETE });

export const createUserForm = form => ({
  type: CREATE_USER_FORM,
  payload: form
});

export const confirmUserSignUp = form => ({
  type: CONFIRM_USER,
  payload: form
});

export const UserChangeForm = form => ({
  type: CHANGE_USER_FORM,
  payload: form
});

export const resetForm = () => ({ type: USER_RESET_FORM });
