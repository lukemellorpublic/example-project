import {
  LOGIN,
  LOGGED_IN,
  LOGIN_FAILED,
  LOGOUT,
  LOGGED_OUT,
  SHOW_ERROR,
  LOAD_DATA,
  USER_UPDATED,
  UPDATE_USER
} from "../actions/constants";
import { takeEvery, put, select, fork } from "redux-saga/effects";
import Auth from "@aws-amplify/auth";

function* login() {
  var loginForm = yield select(state => state.login.form);

  try {
    var user = yield Auth.signIn(loginForm.username, loginForm.password);

    var usersName = yield Auth.currentSession();
    console.log(user);

    yield put({
      type: LOGGED_IN,
      payload: { user: user, data: usersName.idToken.payload.name }
    });
    yield put({ type: LOAD_DATA });
  } catch (err) {
    console.log(err);
    yield put({ type: LOGIN_FAILED, payload: err });
  }
}

function* logout() {
  try {
    // yield call(() => parse.User.logOut());
    yield put({ type: LOGGED_OUT });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: "Could not logout." });
  }
}

function* checkUserStatus() {
  try {
    var user = yield Auth.currentSession();

    // const auth = user && true;
    if (user !== undefined) {
      yield put({
        type: LOGGED_IN,
        payload: { user: user, data: user.idToken.payload.name }
      });
      yield put({ type: LOAD_DATA });
    }
  } catch (error) {
    // ignore this as it just means the user's not logged in
    console.error(error);
  }
}

function* updateUser({ payload }) {
  var user;
  try {
    const result = yield Auth.updateUserAttributes(payload.user, {
      name: payload.name
    });
    if (result === "SUCCESS") {
      user = yield Auth.currentAuthenticatedUser();
    }
    yield put({ type: USER_UPDATED, payload: user.attributes.name });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
    console.error(error);
  }
}

export function* watchLogin() {
  // check for login status on load
  yield fork(checkUserStatus);

  // watch login requests
  yield takeEvery(LOGIN, login);

  // watch logout requests
  yield takeEvery(LOGOUT, logout);

  // watch for user details changes
  yield takeEvery(UPDATE_USER, updateUser);
}
