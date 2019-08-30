import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import PersonAdd from "@material-ui/icons/PersonAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { createUser, createUserComplete } from "../redux/actions/user";
import { openDialog } from "../redux/actions/dialog";
import styles from "../jss/_userManagement";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      hidden: true,
      expanded: false
    };
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  expand() {
    this.setState({ expanded: !this.state.expanded });
  }

  createUser() {
    this.props.createUser(this.state);
  }

  render() {
    const { classes, error, userCreated } = this.props;
    const { name, email, password, hidden, expanded } = this.state;

    if (userCreated && expanded) {
      this.expand();
      this.props.openDialog("User created", undefined, "success");
      this.props.createUserComplete();
    }

    return (
      <ExpansionPanel expanded={expanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => this.expand()}
        >
          <Typography className={classes.heading} variant="h6">
            <PersonAdd /> Create New user
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <TextField
                id="standard-name"
                name="name"
                label="Name"
                className={classes.textField}
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-email"
                name="email"
                label="Email"
                className={classes.emailField}
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={3} className={classes.center}>
              <TextField
                id="standard-password"
                name="password"
                label="Temporary Password"
                className={classes.textField}
                value={password}
                type={hidden ? "password" : ""}
                onChange={e => this.setState({ password: e.target.value })}
                margin="normal"
              />
              <IconButton
                color="primary"
                className={classes.buttonAlignment}
                aria-label="Show / Hide password"
                onClick={this.toggleShow}
              >
                {hidden ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Grid>
            <Grid item xs={2} className={classes.center}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.buttonAlignment}
                onClick={() => {
                  this.createUser();
                }}
              >
                Create
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <p className={classes.errorText}>{error.message}</p>
              </Grid>
            )}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

CreateUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => {
    let userCreated = false;
    if (state.users.response && state.users.response.userCreated) {
      userCreated = true;
    }

    return {
      createUserState: state.createUser,
      error: state.users.error,
      userCreated: userCreated
    };
  },
  { createUser, createUserComplete, openDialog }
)(withStyles(styles)(CreateUser));
