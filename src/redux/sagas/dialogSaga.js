import { takeEvery, put, select } from "redux-saga/effects";
import { CONFIRM_DIALOG, CLOSE_DIALOG } from "../actions/constants";

function* confirmDialog() {
  const delayedAction = yield select(state => state.dialog.delayedAction);

  yield put(delayedAction);

  yield put({ type: CLOSE_DIALOG });
}

export function* watchDialog() {
  yield takeEvery(CONFIRM_DIALOG, confirmDialog);
}
