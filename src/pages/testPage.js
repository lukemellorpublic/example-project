import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Analytics from "@aws-amplify/analytics";

import { API } from "aws-amplify";

Analytics.record("myCustomEvent");

const apiName = "PayAdvanceBackend";
const path = "/pay-advance-create";
const myInit = {
  response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  body:
    '{"title":"Mr","name":"BarryScott","dob":"11/06/1985","address":"2henryroad","ni":"JG103759A","phone":"54564444","email":"BARRYSCOTT@live.co.uk","requested_amount":"1500","requested_at":"15/11/2018","days_since_paid":"5","outstanding_advance":"","outstanding_amount":"","earnings":["200","150","400","250","400","300","800","800","800","800","800","800"]}'
};
const styles = {
  root: {
    backgroundColor: "#e4e4e4",
    height: "100vh"
  },
  login: {
    maxWidth: "600px"
  },
  loginHeader: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    paddingBottom: "20px"
  },
  loginSpinner: {
    paddingTop: "30%",
    height: "100%"
  },
  button: {
    marginTop: "20px",
    width: "100%",
    color: "#2FDFD2"
  },
  loginError: {
    color: "#b61807"
  },
  loginBox: {
    paddingTop: "50px",
    height: "100%"
  },
  textField: {
    width: "100%",
    margin: "auto"
  },
  gridPadding: {
    padding: "25px"
  }
};

const exampleData = {
  title: "Mr",
  name: "Barry Scott",
  dob: "11/06/1985",
  address: "2 henry road",
  ni: "JG103759A",
  phone: "545d6dad4444",
  email: "BARRYSCOTT@live.co.uk",
  requested_amount: "1500",
  requested_at: "15/11/2018",
  days_since_paid: "5",
  outstanding_advance: "",
  outstanding_amount: "",
  earnings: "200,150,400,250,400,300,800,800,800,800,800,800"
};

class TestPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      name: "",
      dob: "",
      address: "",
      ni: "",
      email: "",
      requested_amount: "",
      days_since_paid: "",
      results: {},
      accepted: {},
      updated: {}
    };

    // TODO: COMMENT TO REMOVE PREFILL
    this.state = { ...this.state, ...exampleData };
  }

  submitData = event => {
    const state = { ...this.state };

    const values = {
      title: state.title,
      name: state.name,
      dob: state.dob,
      address: state.address,
      ni: state.ni,
      phone: "07777777777",
      email: state.email,
      requested_amount: state.requested_amount,
      requested_at: "15/11/2018",
      days_since_paid: state.days_since_paid,
      outstanding_advance: "",
      outstanding_amount: "",
      earnings: (
        state.earnings || "200,150,400,250,400,300,800,800,800,800,800,800"
      )
        .replace(/[^0-9,]+/gim, "")
        .split(",")
        .map(earning => +earning)
    };

    const apiValues = {
      ...myInit,
      body: values
    };

    console.log(apiValues);

    API.post(apiName, path, apiValues)
      .then(response => {
        console.log("response.data", response.data);

        var results = {
          status: response.data.status,
          amount: response.data.amount_offered
        };

        this.setState({ results });
      })
      .catch(error => {
        console.log("error", error);
      });

    this.setState({ results: {} });
  };

  // acceptAdvance = event => {
  //   const state = { ...this.state };

  //   const values = {
  //     ni: state.ni,
  //     advance_status: "accepted"
  //   };

  //   const apiValues = {
  //     ...myInit,
  //     body: values
  //   };

  //   API.post(apiName, "/pay-advance-accept-advance", apiValues)
  //     .then(response => {
  //       console.log("response for accept", response.data.body);

  //       var accepted = {
  //         status: response.data.body
  //       };

  //       this.setState({ accepted });
  //     })
  //     .catch(error => {
  //       console.log("error", error);
  //     });

  //   this.setState({ results: {} });
  // };

  acceptAdvance = status => {
    const state = { ...this.state };

    const values = {
      ni: state.ni,
      advance_status: status
    };

    const apiValues = {
      ...myInit,
      body: values
    };

    console.log(apiValues);

    API.post(apiName, "/pay-advance-accept-advance", apiValues)
      .then(response => {
        console.log("response for accept", response);
        var accepted = {
          status: response.data
        };
        this.setState({ accepted });
      })
      .catch(error => {
        console.log("error", error);
      });
    this.setState({ results: {} });
  };

  updateAdvance = status => {
    const state = { ...this.state };

    var values = {
      paid: "100",
      unpaid: "0",
      advance_status: "paid",
      ni: state.ni
    };

    if (status === "default") {
      values.paid = "0";
      values.unpaid = "100";
      values.advance_status = "defaulted";
    }

    const apiValues = {
      ...myInit,
      body: values
    };
    console.log(apiValues);

    API.post(apiName, "/pay-advance-update-advance", apiValues)
      .then(response => {
        console.log("response for accept", response);
        var inputs = response.data;
        var updated = {
          status: inputs.status,
          amount_left: inputs.amount_left
        };

        this.setState({ updated });
      })
      .catch(error => {
        console.log("error", error);
      });

    this.setState({ results: {} });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.results.amount);
    console.log(this.state);
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-around"
          className={classes.loginBox}
        >
          <Grid item xs={6}>
            <Card className={classes.login}>
              <CardContent>
                <form>
                  <div className={classes.loginHeader}>
                    <Typography variant="h5" gutterBottom>
                      Pay Advance Test calculation Form
                    </Typography>
                    <Divider />
                  </div>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        id="title"
                        label="title"
                        className={classes.textField}
                        margin="normal"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-password-input"
                        label="name"
                        className={classes.textField}
                        margin="normal"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-email-input"
                        label="Date of birth"
                        className={classes.textField}
                        margin="normal"
                        name="dob"
                        value={this.state.dob}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-password-input"
                        label="address"
                        className={classes.textField}
                        margin="normal"
                        name="address"
                        value={this.state.address}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-email-input"
                        label="national insurance (required*)"
                        className={classes.textField}
                        margin="normal"
                        name="ni"
                        value={this.state.ni}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-password-input"
                        label="email address"
                        className={classes.textField}
                        margin="normal"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-email-input"
                        label="Requested amount"
                        className={classes.textField}
                        margin="normal"
                        name="requested_amount"
                        value={this.state.requested_amount}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-password-input"
                        label="Days since paid"
                        className={classes.textField}
                        margin="normal"
                        name="days_since_paid"
                        value={this.state.days_since_paid}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-password-input"
                        label="Earnings (4 - 12 values. Please enter values seperated by commas )* "
                        className={classes.textField}
                        margin="normal"
                        name="earnings"
                        value={this.state.earnings}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    Previous earnings are already being entered in the
                    background, to avoid the need to type 12 extra values per
                    test*
                  </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.submitData}
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={12} className={classes.gridPadding}>
                <Card className={classes.reportCards}>
                  <CardContent className={classes.cardContent}>
                    <form>
                      <div className={classes.loginHeader}>
                        <Typography variant="h5" gutterBottom>
                          Calculation Results
                        </Typography>
                        <Divider />
                      </div>
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          {/* {"status":"Accepted","amount":"1500","fees":"???"} */}
                          Status: {this.state.results.status}
                        </Grid>
                        <Grid item xs={12}>
                          Amount:
                          {this.state.results.amount
                            ? " £" + this.state.results.amount
                            : null}
                        </Grid>
                        <Grid item xs={12}>
                          {this.state.results.amount !== undefined ? (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() => this.acceptAdvance("accepted")}
                              >
                                Accept Advance
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() => this.acceptAdvance("declined")}
                              >
                                Decline Advance
                              </Button>
                            </React.Fragment>
                          ) : null}
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} className={classes.gridPadding}>
                <Card className={classes.reportCards}>
                  <CardContent className={classes.cardContent}>
                    <form>
                      <div className={classes.loginHeader}>
                        <Typography variant="h5" gutterBottom>
                          Accept advance response
                        </Typography>

                        <Divider />
                      </div>
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          Status: {this.state.accepted.status}
                        </Grid>
                        <Grid item xs={12} />
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} className={classes.gridPadding}>
                <Card className={classes.reportCards}>
                  <CardContent className={classes.cardContent}>
                    <form>
                      <div className={classes.loginHeader}>
                        <Typography variant="h5" gutterBottom>
                          Update Advance
                        </Typography>
                        {this.state.accepted.status !== undefined ? (
                          <React.Fragment>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              onClick={() => this.updateAdvance("")}
                            >
                              Pay Advance
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              onClick={() => this.updateAdvance("default")}
                            >
                              Default Advance
                            </Button>
                          </React.Fragment>
                        ) : null}
                        <Divider />
                      </div>
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          Status: {this.state.updated.status}
                        </Grid>
                        <Grid item xs={12}>
                          Amount Left: {this.state.updated.amount_left}
                        </Grid>
                        <Grid item xs={12} />
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TestPage);
