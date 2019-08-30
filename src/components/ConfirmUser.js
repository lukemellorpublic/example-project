import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { confirmUserSignUp } from "../redux/actions/user";
import styles from "../jss/_login";

class ConfirmUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  confirmUser() {
    this.props.comfirmUserSignUp({
      code: this.state.code,
      email: this.props.email
    });
  }

  render() {
    const { classes, email, userConfirmed } = this.props;
    const { code } = this.state;

    if (userConfirmed) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.loginBox}
      >
        <Card>
          <CardContent>
            <div className={classes.loginHeader}>
              <Typography variant="h5" gutterBottom>
                Confirm email address
              </Typography>
              <Divider />
            </div>
            <Grid container spacing={4}>
              <Grid item className={classes.center} xs={12}>
                <p>
                  Please enter the confirmation code received via email for the
                  account:
                </p>
                {email}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-password-input"
                  label="Confirmation Code"
                  className={classes.textField}
                  autoComplete="current-confirmation"
                  margin="normal"
                  onChange={e => this.setState({ code: e.target.value })}
                  value={code}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                this.props.confirmUserSignUp({ email, code });
              }}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

ConfirmUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    state => ({}),
    { confirmUserSignUp }
  )(withStyles(styles)(ConfirmUser))
);
