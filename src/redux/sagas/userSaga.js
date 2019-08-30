import { takeEvery, put } from "redux-saga/effects";
import { API } from "aws-amplify";
import Auth from "@aws-amplify/auth";
import {
  LOAD_USERS,
  USERS_LOADED,
  SHOW_ERROR,
  SAVE_USER,
  USER_DELETED,
  DELETE_USER,
  CREATE_USER,
  CONFIRM_USER,
  EDIT_USER,
  USER_ERROR,
  REFRESH_USERS,
  CREATE_COMPLETE,
  USER_CONFIRMED
} from "../actions/constants";

const apiName = "PayAdvanceBackend";

function* loadUsers() {
  try {
    const users = yield API.post(apiName, "/pay-advance-get-users", {
      body: { poolId: "eu-west-2_QdsTkXP9P" },
      headers: {}
    });
    yield put({ type: USERS_LOADED, payload: JSON.parse(users.body) });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
    console.error(error);
  }
}

function* saveUser({ payload }) {
  try {
    const result = yield Auth.updateUserAttributes(payload.user, {
      name: payload.name
    });

    yield put({ type: LOAD_USERS, payload: result });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
    console.error(error);
  }
}

function* createUser({ payload }) {
  try {
    const signUp = yield Auth.signUp({
      username: payload.email,
      password: payload.password,
      attributes: {
        email: payload.email,
        name: payload.name
      }
    });
    yield put({ type: LOAD_USERS, payload: { signUp, userCreated: true } });
  } catch (error) {
    yield put({ type: USER_ERROR, payload: error });
    console.error(error);
  }
}

// function* confirmUserSignUp({ payload }) {
//   try {
//     const signUp = yield Auth.confirmSignUp(payload.email, payload.code, {
//       forceAliasCreation: false
//     });
//     if (JSON.parse(signUp.body).code === "ExpiredCodeException") {
//       Auth.resendSignUp(payload.email)
//         .then(() => {
//           console.log("code resent successfully");
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     } else {
//       yield put({ type: USERS_LOADED, payload: JSON.parse(signUp.body) });
//     }
//   } catch (error) {
//     yield put({ type: SHOW_ERROR, payload: error });
//     console.error(error);
//   }
// }

function* confirmUserSignUp({ payload }) {
  try {
    let response = false;
    // const user = yield Auth.confirmSignUp(payload.email, payload.code, {
    yield Auth.confirmSignUp(payload.email, payload.code, {
      forceAliasCreation: false
    })
      .then(data => {
        console.log(data);
        if (data === "SUCCESS") {
          response = true;
        }
      })
      .catch(err => {
        console.log(err);
        if (err.code === "ExpiredCodeException") {
          Auth.resendSignUp(payload.email)
            .then(() => {
              console.log("code resent successfully");
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
    yield put({ type: USER_CONFIRMED, payload: response });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
    console.error(error);
  }
}

function* editUser({ payload }) {
  try {
    let user = yield Auth.currentAuthenticatedUser();
    // let result = await Auth.updateUserAttributes(user, {
    //     'email': 'me@anotherdomain.com',
    //     'family_name': 'Lastname'
    // });
    yield put({ type: SHOW_ERROR, payload: user });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
  }
}

function* deleteUser({ payload }) {
  try {
    const users = yield API.post(apiName, "/pay-advance-delete-user", {
      body: { username: payload },
      headers: {}
    });
    yield put({ type: USER_DELETED, payload: users.body });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
  }
}

function* createUserComplete() {
  yield put({ type: LOAD_USERS, payload: { userCreated: false } });
}

function* refreshUser() {
  try {
    const result = yield Auth.currentAuthenticatedUser();
    console.log(result);

    yield put({ type: LOAD_USERS, payload: result, response: "SUCCESS" });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
    console.error(error);
  }
}

export function* watchUsers() {
  yield takeEvery(REFRESH_USERS, refreshUser);
  yield takeEvery(LOAD_USERS, loadUsers);
  yield takeEvery(SAVE_USER, saveUser);
  yield takeEvery(DELETE_USER, deleteUser);
  yield takeEvery(CREATE_USER, createUser);
  yield takeEvery(CONFIRM_USER, confirmUserSignUp);
  yield takeEvery(EDIT_USER, editUser);
  yield takeEvery(CREATE_COMPLETE, createUserComplete);
}
