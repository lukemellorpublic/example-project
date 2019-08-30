import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { logout } from "../redux/actions/auth";

// TODO: Move to stylesheet
const styles = {
  appBar: {},
  drawerPaper: {},
  content: {},
  toolbar: {},
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    color: "#fff"
    // marginLeft: 105
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    marginLeft: 15,
    marginRight: 10
  },
  button: {
    marginLeft: 20
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#2FDFD2"
  }
};

class MenuAppBar extends React.Component {
  state = {
    open: false
  };

  initialGrabber = word => {
    var matches = word.match(/\b(\w)/g); // ['J','S','O','N']
    return matches.join(""); // JSON
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { loggedIn, logout, classes, userName } = this.props;
    const { open } = this.state;
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={classes.grow} gutterBottom>
              Pay Advance Console
            </Typography>
            {loggedIn && (
              <React.Fragment>
                <div>
                  <Button
                    buttonRef={node => {
                      this.anchorEl = node;
                    }}
                    aria-owns={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                  >
                    <Avatar className={classes.purpleAvatar}>
                      {this.initialGrabber(userName)}
                    </Avatar>
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={this.anchorEl}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom"
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList>
                              <Link
                                to="/profile"
                                style={{
                                  textDecoration: "none",
                                  color: "black"
                                }}
                              >
                                <MenuItem onClick={this.handleClose}>
                                  My account
                                </MenuItem>
                              </Link>
                              <MenuItem onClick={logout}>Sign out</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({
    loggedIn: state.login.loggedIn,
    currentUser: state.login.currentUser,
    userName: state.login.userName
  }),
  { logout }
)(withStyles(styles)(MenuAppBar));
