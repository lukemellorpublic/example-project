import { takeEvery, put } from "redux-saga/effects";
import {
  GET_FEES,
  RETURN_FEES,
  SHOW_ERROR,
  SUBMIT_FEES
} from "../actions/constants";
import { API } from "aws-amplify";

const apiName = "PayAdvanceBackend";

let postData = {
  body: {},
  header: {}
};

function* getFees() {
  try {
    var fees = yield API.get(apiName, "/pay-advance-fees-get");
    yield put({
      type: RETURN_FEES,
      payload: { fees }
    });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
  }
}

function* sumbitFees({ payload }) {
  postData.body = payload;
  try {
    var fees = yield API.post(apiName, "/pay-advance-fees-create", postData);
    console.log("fees recieved", fees);
    yield put({
      type: GET_FEES
    });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
  }
}

export function* watchFees() {
  yield takeEvery(GET_FEES, getFees);
  yield takeEvery(SUBMIT_FEES, sumbitFees);
}
