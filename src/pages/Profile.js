import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import styles from "../jss/_dashboard";
import { updateUser } from "../redux/actions/auth";
import Auth from "@aws-amplify/auth";

class Profile extends React.Component {
  state = {
    name: "",
    email: "",
    email_verified: "Controlled",
    editing: true,
    loaded: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  enableEditing = () => {
    this.setState({ editing: !this.state.editing });
  };

  initialGrabber = word => {
    if (word.match(/[a-z]/i)) {
      var matches = word.match(/\b(\w)/g); // ['J','S','O','N']
      return matches.join(""); // JSON
    }
  };

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(response => {
      var userData = response.attributes;
      this.setState({
        name: userData.name,
        email: userData.email,
        loaded: true
      });
    });
  }

  updateUser() {
    Auth.currentAuthenticatedUser().then(response => {
      this.props.updateUser({ user: response, name: this.state.name });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={1}>
                  {this.state.loaded && this.state.name !== "" ? (
                    <Avatar className={classes.purpleAvatar}>
                      {this.initialGrabber(this.state.name)}
                    </Avatar>
                  ) : (
                    <Grid
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="center"
                      className={classes.loginSpinner}
                    >
                      <CircularProgress
                        className={classes.progress}
                        size={50}
                      />
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={10}>
                  <h3>Your account </h3>
                </Grid>
                <Grid item xs={1}>
                  {!this.state.editing && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.editButton}
                      onClick={() => this.updateUser()}
                    >
                      Save
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.reportCards}>
            <CardContent className={classes.cardContent}>
              {this.state.loaded ? (
                <React.Fragment>
                  <TextField
                    id="standard-name"
                    label="Email"
                    disabled={true}
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    margin="normal"
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
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Card className={classes.reportCards}>
            <CardContent className={classes.cardContent}>
              {this.state.loaded ? (
                <React.Fragment>
                  <TextField
                    id="standard-name"
                    label="Name"
                    disabled={this.state.editing}
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange("name")}
                    margin="normal"
                  />
                  <IconButton
                    variant="contained"
                    color="primary"
                    className={classes.editButton}
                    onClick={() => this.enableEditing()}
                  >
                    <EditIcon />
                  </IconButton>
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
        <Grid item xs={6} />
      </Grid>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({
    currentUser: state.login.currentUser,
    response: state.response
  }),
  { updateUser }
)(withStyles(styles)(Profile));
