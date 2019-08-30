import { combineReducers } from "redux";

import authReducer from "./authReducer";
import reportReducer from "./reportReducer";
import errorReducer from "./errorReducer";
import dialogReducer from "./dialogReducer";
import userReducer from "./userReducer";
import feesReducer from "./feeReducer";

const rootReducer = combineReducers({
  login: authReducer,
  reports: reportReducer,
  users: userReducer,
  error: errorReducer,
  dialog: dialogReducer,
  fees: feesReducer
});

export default rootReducer;
