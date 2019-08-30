import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Line, Radar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Dashboard from "@material-ui/icons/Dashboard";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "../jss/_dashboard";
import moment from "moment";
import { loadDashboardReports } from "../redux/actions/report";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillMount() {
    this.props.loadDashboardReports();
  }

  render() {
    const { classes } = this.props;
    var AdvancesRequested, chartBody, radiusChart;
    if (this.props.reports.data.result !== undefined) {
      AdvancesRequested = this.props.reports.data.result.report;
      radiusChart = this.props.reports.data.result.radiusChart;
      chartBody =
        "For the past month ( " +
        moment()
          .subtract(30, "days")
          .format("DD/MM/YYYY") +
        " - " +
        moment().format("DD/MM/YYYY") +
        " )";
    }

    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={9}>
                  <h3>
                    <Dashboard />
                    Dashboard
                  </h3>
                </Grid>
                <Grid item xs={3} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.reportCards}>
            <CardContent className={classes.cardContent}>
              {radiusChart ? (
                <React.Fragment>
                  <Radar
                    data={{
                      labels: radiusChart.map(v => v.label),
                      datasets: [
                        {
                          label: "All advances by stage in the process",
                          backgroundColor: "rgba(47, 223, 210, 0.55)",
                          borderColor: "rgb(2, 84, 98, 1)",
                          borderWidth: 1,
                          hoverBackgroundColor: "rgb(47, 223, 210, 0.4)",
                          hoverBorderColor: "rgb(47, 223, 210, 1)",
                          data: radiusChart.map(v => v.value)
                        }
                      ]
                    }}
                    options={{
                      scale: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1,
                          min: 0,
                          autoSkip: true
                        }
                      }
                    }}
                  />
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
        <Grid item xs={6}>
          <Card className={classes.reportCards}>
            <CardContent className={classes.cardContent}>
              {AdvancesRequested && radiusChart ? (
                <React.Fragment>
                  <Line
                    data={{
                      labels: AdvancesRequested.data.map(v => v.date),
                      datasets: [
                        {
                          label: "Advances requested per day",
                          backgroundColor: "rgb(2, 84, 98, 0.7)",
                          borderColor: "rgb(2, 84, 98, 1)",
                          borderWidth: 1,
                          hoverBackgroundColor: "rgb(47, 223, 210, 0.4)",
                          hoverBorderColor: "rgb(47, 223, 210, 1)",
                          data: AdvancesRequested.data.map(v => v.value)
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
                              stepSize: 1,
                              min: 0,
                              autoSkip: true
                            }
                          }
                        ],
                        yAxes: [
                          {
                            display: true,
                            ticks: {
                              stepSize: 1,
                              beginAtZero: true,
                              suggestedMax: 5
                            }
                          }
                        ]
                      }
                    }}
                  />
                  <p className={classes.chartBody}>{chartBody}</p>
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
        <Grid item xs={12}>
          <Card className={classes.reportCards}>
            <CardContent className={classes.cardContent}>
              <h4>
                Welcome to the Pay Advance administrator console. Here you can
                view reports and manage users.
              </h4>
              To access the test calculation page, please click:
              <Link to="/testAdvance" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  to test page
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({ reports: state.reports }),
  { loadDashboardReports }
)(withStyles(styles)(DashboardPage));
