import moment from "moment";

export const parseISOString = s => {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

export const getDateArray = (start, end) => {
  var arr = [];
  var dt = new Date(start);
  while (dt <= end) {
    arr.push({ date: moment(new Date(dt)).format("DD/MM/YYYY"), value: 0 });
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};
