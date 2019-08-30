import {
  REPORTS_LOADED,
  LOAD_REPORTS,
  LOAD_DASHBOARD_REPORT
} from "../actions/constants";
import moment from "moment";

const initialState = {
  form: {
    reportType: "requested",
    startDateTime: moment().subtract(30, "days"),
    endDateTime: moment()
  },
  data: {},
  inProgress: false
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORTS_LOADED:
      return { ...state, data: action.payload, inProgress: false };
    case LOAD_REPORTS:
      return { ...state, inProgress: true };
    case LOAD_DASHBOARD_REPORT:
      return { ...state };
    default:
      return state;
  }
};

export default reportReducer;
