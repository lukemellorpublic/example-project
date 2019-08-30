import { all, takeEvery, put } from "redux-saga/effects";
import { LOAD_DATA, LOAD_REPORTS, LOAD_USERS } from "../actions/constants";

import { watchLogin } from "./authSaga";
import { watchReports } from "./reportSaga";
import { watchDialog } from "./dialogSaga";
import { watchUsers } from "./userSaga";
import { watchFees } from "./feeSaga";

function* loadData() {
  yield put({ type: LOAD_REPORTS });
  yield put({ type: LOAD_USERS });
}

export default function* rootSaga() {
  // var config = yield call(() => fetch('/config.json').then(res => res.json()));

  yield takeEvery(LOAD_DATA, loadData);

  // make sure that the watchLogin is at the end, otherwise it won't load data onload
  yield all([
    watchDialog(),
    watchReports(),
    watchLogin(),
    watchUsers(),
    watchFees()
  ]);
}
