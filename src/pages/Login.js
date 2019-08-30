import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import ConfirmUser from "../components/ConfirmUser";
import { login, loginChangeForm } from "../redux/actions/auth";
import { styles } from "../jss/_login";

const LoginPage = props => {
  const { from } = props.location.state || { from: { pathname: "/" } };
  const { classes, userConfirmed } = props;

  if (props.loginState.loggedIn) {
    return <Redirect to={from} />;
  }

  return (
    <div className="group">
      {props.loginState.inProgress ? (
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
        <React.Fragment>
          {props.loginState.error.message === "User is not confirmed." &&
          !userConfirmed ? (
            <ConfirmUser email={props.loginState.form.username} />
          ) : (
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              className={classes.loginBox}
            >
              <Card>
                <CardContent>
                  <form>
                    <div className={classes.loginHeader}>
                      <Typography variant="h5" gutterBottom>
                        Pay Advance Console
                      </Typography>
                      <Divider />
                    </div>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          id="standard-email-input"
                          label="Email"
                          className={classes.textField}
                          type="email"
                          autoComplete="email"
                          margin="normal"
                          onChange={e =>
                            props.loginChangeForm({
                              ...props.loginState.form,
                              username: e.target.value
                            })
                          }
                          value={props.loginState.form.username}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="standard-password-input"
                          label="Password"
                          className={classes.textField}
                          type="password"
                          autoComplete="current-password"
                          margin="normal"
                          onChange={e =>
                            props.loginChangeForm({
                              ...props.loginState.form,
                              password: e.target.value
                            })
                          }
                          value={props.loginState.form.password}
                        />
                      </Grid>
                    </Grid>

                    <Typography variant="caption" gutterBottom>
                      <Link
                        to="/forgottenPassword"
                        style={{ textDecoration: "none" }}
                      >
                        Forgotten password
                      </Link>
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.button}
                      onClick={() => props.login(props.location.state)}
                    >
                      Login
                    </Button>
                  </form>
                  {props.loginState.error.message && (
                    <p> Error: {props.loginState.error.message}</p>
                  )}
                </CardContent>
              </Card>
            </Grid>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  let confirmed = false;
  if (state.users.userConfirmed) {
    confirmed = true;
  }
  return { userConfirmed: confirmed, loginState: state.login };
};

export default connect(
  mapStateToProps,
  { login, loginChangeForm }
)(withStyles(styles)(LoginPage));
