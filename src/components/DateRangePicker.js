import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import styles from "../jss/_datepicker";

import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import { withStyles } from "@material-ui/core/styles";

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment()
    };
  }

  render() {
    const {
      classes,
      startDate,
      endDate,
      handleChangeStart,
      handleChangeEnd
    } = this.props;

    return (
      <div>
        {/* From Start Date */}
        <DatePicker
          selected={startDate}
          selectsStart
          required
          showTimeSelect
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="Time"
          startDate={startDate}
          endDate={endDate}
          onChange={handleChangeStart}
          className={classes.datePicker}
        />
        <span className={classes.text}>
          <ArrowRightAlt />
        </span>
        {/* To End Date */}
        <DatePicker
          selected={endDate}
          selectsEnd
          required
          showTimeSelect
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="Time"
          startDate={startDate}
          endDate={endDate}
          onChange={handleChangeEnd}
          className={classes.datePicker}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DateRangePicker);
