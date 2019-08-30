import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { confirmUserSignUp } from "../redux/actions/user";
import styles from "../jss/_externalPages";
import Auth from "@aws-amplify/auth";

class ForgottenPassword extends React.Component {
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
    const { classes, email } = this.props;
    const { code } = this.state;

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
                ForgottenPassword
              </Typography>
              <Divider />
            </div>
            <Grid container spacing={4}>
              <Grid item className={classes.center} xs={12}>
                <p>Please enter the email address for your account:</p>
                {email}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-password-input"
                  label="Email Address"
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
                Auth.forgotPassword(code)
                  .then(data => {
                    console.log(data);
                    if (data === "SUCCESS") {
                      this.awaitCode();
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });

                // this.confirmUserSignUp;
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

ForgottenPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({}),
  { confirmUserSignUp }
)(withStyles(styles)(ForgottenPassword));
