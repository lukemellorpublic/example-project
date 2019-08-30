import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InsertChart from "@material-ui/icons/InsertChart";

import { loadReports } from "../redux/actions/report";
import styles from "../jss/_reports";
import SimpleTable from "../components/SimpleTable";
import NoData from "../components/NoData";
import DateRangePicker from "../components/DateRangePicker";
import { parseISOString } from "../utils/date-utils";

const reportTypes = [
  "Advances Requested",
  "Advances Given",
  "Advances Repaid",
  "Unpaid Advances",
  "Total Fees",
  "Advances Defaulted"
];

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        reportType: "Advances Requested",
        startDate: moment().subtract(30, "days"),
        endDate: moment()
      },
      reportData: this.props.reports.data.report || []
    };
  }

  handleChange = event => {
    var newValues = this.state;
    newValues.form.reportType = event.target.value;
    this.setState({ newValues });

    this.props.loadReports(this.state.form);
  };

  componentWillMount() {
    this.props.loadReports(this.state.form);
  }

  parseISOString(ISO) {
    var part = ISO.split(/\D+/);
    return new Date(
      Date.UTC(part[0], --part[1], part[2], part[3], part[4], part[5], part[6])
    );
  }

  handleChangeStart = date => {
    var newValues = this.state;
    newValues.form.startDate = date;
    this.setState({ newValues });

    this.props.loadReports(this.state.form);
  };

  handleChangeEnd = date => {
    var newValues = this.state;
    newValues.form.endDate = date;
    this.setState({ newValues });

    this.props.loadReports(this.state.form);
  };

  render() {
    const { classes } = this.props;
    var reportData, fullData;

    if (this.props.reports.data.result !== undefined) {
      reportData = this.props.reports.data.result.report;
      fullData = this.props.reports.data.result.fullData;
    }

    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <h3>
                    {" "}
                    <InsertChart />
                    Reports{" "}
                  </h3>
                  Here are the reports on advances at their current state
                </Grid>
                <Grid item xs={9}>
                  <DateRangePicker
                    handleChangeStart={this.handleChangeStart}
                    handleChangeEnd={this.handleChangeEnd}
                    startDate={this.state.form.startDate}
                    endDate={this.state.form.endDate}
                    className={classes.datePicker}
                  />
                </Grid>
                <Grid item xs={3} className={classes.selectArea}>
                  <Select
                    value={this.state.form.reportType}
                    onChange={this.handleChange}
                    autoWidth
                    displayEmpty
                    className={classes.selectBorder}
                    inputProps={{
                      name: "reportType"
                    }}
                  >
                    {reportTypes.map(reportType => (
                      <MenuItem
                        key={reportType}
                        value={reportType}
                      >
                        {reportType}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Card className={classes.reportCards}>
            <CardContent className={classes.cardContent}>
              {this.props.reports.data.result ? (
                <React.Fragment>
                  {reportData.data.length === 0 ? (
                    <NoData text={this.state.form.reportType} />
                  ) : (
                      <Line
                        data={{
                          labels: reportData.data.map(v => v.date),
                          datasets: [
                            {
                              label: this.state.form.reportType,
                              backgroundColor: "rgb(2, 84, 98, 0.7)",
                              borderColor: "rgb(2, 84, 98, 1)",
                              borderWidth: 1,
                              hoverBackgroundColor: "rgb(47, 223, 210, 0.4)",
                              hoverBorderColor: "rgb(47, 223, 210, 1)",
                              data: reportData.data.map(v => v.value)
                            }
                          ]
                        }}
                        options={{
                          scales: {
                            xAxes: [
                              {
                                stacked: false,
                                beginAtZero: true,
                                scaleLabel: {
                                  labelString: "Month"
                                },
                                ticks: {
                                  precision:0,
                                  min: 0,
                                  autoSkip: true
                                }
                              }
                            ],
                            yAxes: [
                              {
                                display: true,
                                ticks: {
                                  precision:0,
                                  beginAtZero: true,
                                  suggestedMax: 5
                                }
                              }
                            ]
                          }
                        }}
                      />
                    )}
                </React.Fragment>
              ) : (
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    className={classes.loginSpinner}
                  >
                    <CircularProgress className={classes.progress} size={50} />
                  </Grid>
                )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Card className={classes.reportCards}>
            <CardContent className={classes.cardContent}>
              {this.props.reports.data.result ? (
                <React.Fragment>
                  {reportData.data.length === 0 ? (
                    <NoData text={this.state.form.reportType} />
                  ) : (
                      <React.Fragment>
                        <div className={classes.minimalTable}>
                          <SimpleTable
                            header={this.state.form.reportType !== "Total Fees" ? this.state.form.reportType : "Total fees per day"}
                            data={reportData}
                          />
                        </div>
                        <div className={classes.minimalTable}>
                          <Table>
                            <colgroup>
                              <col width="50%" />
                              <col width="50%" />
                            </colgroup>
                            <TableBody>
                              <TableRow>
                                <TableCell>Total:</TableCell>
                                <TableCell>
                                  {reportData.total.toString()}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </React.Fragment>
                    )}
                </React.Fragment>
              ) : (
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    className={classes.loginSpinner}
                  >
                    <CircularProgress className={classes.progress} size={50} />
                  </Grid>
                )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Card className={classes.reportCards}>
            <CardContent className={classes.cardContent}>
              <h4>{this.state.form.reportType} totals</h4>
              {fullData && fullData.data ? (
                <React.Fragment>
                  {reportData.data.length === 0 ? (
                    <NoData text={this.state.form.reportType} />
                  ) : (
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Total amount Unpaid:
                          </TableCell>
                            <TableCell>
                              {new Intl.NumberFormat("en-GB", {
                                style: "currency",
                                currency: "GBP"
                              }).format(fullData.unpaid_total)}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              Total amount Paid:
                          </TableCell>
                            <TableCell>
                              {new Intl.NumberFormat("en-GB", {
                                style: "currency",
                                currency: "GBP"
                              }).format(fullData.paid_total)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    )}
                </React.Fragment>
              ) : (
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    className={classes.loginSpinner}
                  >
                    <CircularProgress className={classes.progress} size={50} />
                  </Grid>
                )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Card className={classes.reportCards}>
            <CardContent className={classes.cardContent}>
              <h4>Full list of {this.state.form.reportType}</h4>
              {fullData && fullData.data ? (
                <React.Fragment>
                  {reportData.data.length === 0 ? (
                    <NoData text={this.state.form.reportType} />
                  ) : (
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Date Requested </TableCell>
                            <TableCell>Name </TableCell>
                            <TableCell>Amount Unpaid </TableCell>
                            <TableCell>Amount Paid</TableCell>
                            <TableCell />
                            <TableCell>Status </TableCell>
                            {this.state.form.reportType === "Total Fees" && (<TableCell>Fees </TableCell>)}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.keys(fullData.data).map((key, index) => (
                            <TableRow
                              key={
                                key + index + fullData.data[key].date_requested
                              }
                            >
                              <TableCell component="th" scope="row">
                                {moment(
                                  parseISOString(
                                    fullData.data[key].date_requested
                                  )
                                ).format("DD/MM/YYYY")}
                              </TableCell>
                              <TableCell>
                                {fullData.data[key].users_name}
                              </TableCell>
                              <TableCell>
                                {new Intl.NumberFormat("en-GB", {
                                  style: "currency",
                                  currency: "GBP"
                                }).format(
                                  fullData.data[key].amount_of_advance_unpaid
                                )}
                              </TableCell>
                              <TableCell>
                                {new Intl.NumberFormat("en-GB", {
                                  style: "currency",
                                  currency: "GBP"
                                }).format(
                                  fullData.data[key].amount_of_advance_paid
                                )}
                              </TableCell>
                              <TableCell />
                              <TableCell>
                                {fullData.data[key].advance_status}
                              </TableCell>
                              {this.state.form.reportType === "Total Fees" && (<TableCell>
                                {fullData.data[key].fee}
                              </TableCell>)}

                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                </React.Fragment>
              ) : (
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    className={classes.loginSpinner}
                  >
                    <CircularProgress className={classes.progress} size={50} />
                  </Grid>
                )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({
    form: state.reports.form,
    reports: state.reports,
    inProgress: state.reports.inProgress
  }),
  { loadReports }
)(withStyles(styles)(Reports));
