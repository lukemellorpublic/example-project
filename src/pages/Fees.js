import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "../jss/_fees";
import { getFees, submitFees } from "../redux/actions/fees";
import {
  getColumns,
  checkForOverlappingRanges,
  checkForMissingFields,
  checkForOverlap
} from "../utils/utils";
import MaterialTable from "material-table";

class FeesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: getColumns(),
      data: this.props.fees,
      overlapErrors: [],
      missingDataErrors: [],
      rangeErrors: []
    };
  }

  componentWillMount() {
    this.props.getFees();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.fees.length !== this.props.fees) {
      this.setState({ columns: getColumns(), data: newProps.fees });
    }
  }

  submitData = () => {
    const { data } = this.state;
    var missingDataErrors = [];
    var overlapErrors = [];
    var rangeOverlap = [];
    overlapErrors = checkForOverlappingRanges(data);
    missingDataErrors = checkForMissingFields(data);
    rangeOverlap = checkForOverlap(data);

    if (overlapErrors.length === 0 && missingDataErrors.length === 0) {
      this.setState({
        ...this.state,
        overlapErrors: [],
        missingDataErrors: [],
        rangeErrors: []
      });
      this.props.submitFees(data);
    } else {
      this.setState({
        ...this.state,
        overlapErrors: overlapErrors,
        missingDataErrors: missingDataErrors,
        rangeErrors: rangeOverlap
      });
    }
  };

  render() {
    const { classes, inProgress } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <h3>
                      <AttachMoney /> Fees
                    </h3>
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.editButton}
                      onClick={() =>
                        this.setState({
                          columns: getColumns(),
                          data: this.props.fees
                        })
                      }
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.editButton}
                      onClick={() => this.submitData()}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {(this.state.overlapErrors.length !== 0 ||
            this.state.missingDataErrors.length !== 0 ||
            this.state.rangeErrors.length !== 0) && (
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <h3 style={{ color: "#d80101" }}>ERRORS:</h3>
                      {this.state.missingDataErrors.length !== 0 && (
                        <React.Fragment>
                          <h5>
                            The following list of fee ranges missing fields,
                            enter data all fields to save fees
                          </h5>
                          <ul>
                            {this.state.missingDataErrors.map(error => {
                              return (
                                <li key={error.minAmount + error.maxAmount}>
                                  <b>label:</b>
                                  {"  "}
                                  {error.label === undefined
                                    ? "No label found"
                                    : error.label}
                                  {"  --  "}

                                  <b>minAmount:</b>
                                  {"  "}
                                  {error.minAmount === undefined
                                    ? "No minAmount found"
                                    : error.minAmount}
                                  {"  --  "}

                                  <b>maxAmount:</b>
                                  {"  "}
                                  {error.maxAmount === undefined
                                    ? "No maxAmount found"
                                    : error.maxAmount}
                                  {"  --  "}

                                  <b>fees:</b>
                                  {"  "}
                                  {error.fee === undefined
                                    ? "No fee found"
                                    : error.fee}
                                </li>
                              );
                            })}
                          </ul>
                        </React.Fragment>
                      )}
                      {this.state.rangeErrors.length !== 0 && (
                        <React.Fragment>
                          <h5>
                            The following list of fee ranges have a minimum
                            amount higher than the maximum amount
                          </h5>
                          <ul>
                            {this.state.rangeErrors.map(error => {
                              return (
                                <li key={error.minAmount + error.maxAmount}>
                                  <b>label:</b> {error.label}
                                </li>
                              );
                            })}
                          </ul>
                        </React.Fragment>
                      )}
                      {this.state.overlapErrors.length !== 0 && (
                        <React.Fragment>
                          <h5>
                            The following list of fee ranges have overlapping
                            minimum amounts or maximum amounts
                          </h5>
                          <ul>
                            {this.state.overlapErrors.map(error => {
                              return (
                                <li key={error.minAmount + error.maxAmount}>
                                  <b>label:</b> {error.label}
                                </li>
                              );
                            })}
                          </ul>
                        </React.Fragment>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}

          <Grid item xs={12}>
            {inProgress ? (
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                className={classes.loginSpinner}
              >
                <CircularProgress className={classes.progress} size={50} />
              </Grid>
            ) : (
              <MaterialTable
                title="Fees management"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                  onRowAdd: newData =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        const data = [...this.state.data];
                        data.push({
                          maxAmount: newData.maxAmount,
                          fee: newData.fee,
                          minAmount: newData.minAmount,
                          label: newData.label
                        });
                        this.setState({ ...this.state, data });
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        const data = [...this.state.data];
                        data[data.indexOf(oldData)] = newData;
                        this.setState({ ...this.state, data });
                      }, 600);
                    }),
                  onRowDelete: oldData =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        const data = [...this.state.data];
                        data.splice(data.indexOf(oldData), 1);
                        this.setState({ ...this.state, data });
                      }, 600);
                    })
                }}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

FeesPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    fees: state.fees.fees,
    inProgress: state.fees.inProgress
  };
};

export default connect(
  mapStateToProps,
  { getFees, submitFees }
)(withStyles(styles)(FeesPage));
