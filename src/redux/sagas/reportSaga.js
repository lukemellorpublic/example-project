import { takeEvery, put } from "redux-saga/effects";
import moment from "moment";
import {
  SHOW_ERROR,
  LOAD_REPORTS,
  REPORTS_LOADED,
  LOAD_DASHBOARD_REPORT
} from "../actions/constants";
import { API } from "aws-amplify";
import { getDateArray } from "../../utils/date-utils";

var _ = require("lodash");

const apiName = "PayAdvanceBackend";

let postData = {
  body: {
    status: "requested",
    startDate: "2019-01-02T13:36:20.522Z",
    endDate: "2019-01-04T13:36:20.522Z"
  },
  headers: {}
};

function* loadReports(input) {
  if (input.hasOwnProperty("payload")) {
    postData = {
      body: {
        status: input.payload.reportType
          .replace("Advances", "")
          .toLowerCase()
          .replace(" ", ""),
        startDate: input.payload.startDate._d.toISOString(),
        endDate: input.payload.endDate._d.toISOString()
      },
      headers: {}
    };
  }

  try {
    var data = yield API.post(apiName, "/pay-advance-dynamic-query", postData);
    var report = [];
    if (input.payload.reportType === "Total Fees") {
      report = _(data.body)
        .groupBy(item => item.date_requested)
        .mapValues(item => _.map(item, "fee"))
        .value();
    } else {
      report = _(data.body)
        .groupBy(item => item.date_requested)
        .mapValues(item => _.map(item, "advance_status"))
        .value();
    }

    var result = {
      report: {
        data: [],
        labels: [],
        fullData: _(data.body)
          .orderBy(v => v.date_requested)
          .value()
          .reverse(),
        total: 0
      },
      fullData: {
        data: data.body,
        unpaid_total: 0,
        paid_total: 0
      }
    };
    if (input.payload.reportType !== "Total Fees") {
      Object.keys(report).forEach(key => {
        result.report.data.push({
          date: key,
          value: report[key].length
        });
        result.report.total += report[key].length;
      });
    } else {
      Object.keys(report).forEach(key => {
        result.report.data.push({
          date: key,
          value: parseInt(report[key], 10)
        });
        result.report.total += parseInt(report[key], 10);
      });
    }


    var datesArray = getDateArray(
      new Date(moment(input.payload.startDate._d.toISOString())),
      new Date(moment(input.payload.endDate._d.toISOString()))
    );

    datesArray.forEach(element => {
      result.report.data.forEach(result => {
        if (element.date === moment(new Date(result.date)).format("DD/MM/YYYY")) {
          element.value += result.value;
        }
      });
    });

    result.report.data = datesArray.sort(function (a, b) {
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });

    Object.keys(data.body).forEach(element => {
      result.fullData.paid_total =
        result.fullData.paid_total +
        Math.round(data.body[element].amount_of_advance_paid * 100) / 100;
    });

    Object.keys(data.body).forEach(element => {
      result.fullData.unpaid_total =
        result.fullData.unpaid_total +
        Math.round(data.body[element].amount_of_advance_unpaid * 100) / 100;
    });

    result.fullData.unpaid_total =
      Math.round(result.fullData.unpaid_total * 100) / 100;
    result.fullData.paid_total =
      Math.round(result.fullData.paid_total * 100) / 100;

    result.fullData.data = _.orderBy(
      result.fullData.data,
      o => {
        return o.date_requested;
      },
      ["asc"]
    );

    yield put({
      type: REPORTS_LOADED,
      payload: { result }
    });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
  }
}

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function* loadDashboardReport() {
  try {
    var data = yield API.post(apiName, "/pay-advance-dynamic-query", {
      body: {
        reportType: "requested",
        startDate: moment().subtract(30, "days"),
        endDate: moment()
      },
      headers: {}
    });

    var radiusChart = yield API.get(apiName, "/pay-advance-get-totals");

    var report = _(data.body)
      .groupBy(item => parseISOString(item.date_requested))
      .mapValues(item => _.map(item, "advance_status"))
      .value();

    var result = {
      report: {
        data: []
      },
      fullData: {
        data: data.body,
        total: 0
      },
      radiusChart: radiusChart
    };

    Object.keys(report).forEach(key => {
      result.report.data.push({
        date: key,
        value: report[key].length
      });
      result.report.total += report[key].length;
    });

    var datesArray = getDateArray(
      new Date(moment().subtract(30, "days")),
      new Date(moment())
    );

    datesArray.forEach(element => {
      result.report.data.forEach(result => {
        if (element.date === moment(new Date(result.date)).format("DD/MM/YYYY")) {
          element.value += result.value;
        }
      });
    });

    result.report.data = datesArray.sort(function (a, b) {
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });

    yield put({
      type: REPORTS_LOADED,
      payload: { result }
    });
  } catch (error) {
    yield put({ type: SHOW_ERROR, payload: error });
  }
}

export function* watchReports() {
  yield takeEvery(LOAD_REPORTS, loadReports);
  yield takeEvery(LOAD_DASHBOARD_REPORT, loadDashboardReport);
}
