import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { Drawer, List, withStyles } from "@material-ui/core";

import UsersPage from "./pages/UserManagement";
import DashboardPage from "./pages/Dashboard";
import ReportPage from "./pages/Reports";
import testPage from "./pages/testPage";
import LoginPage from "./pages/Login";
import FeesPage from "./pages/Fees";

import ForgottenPassword from "./components/ForgottenPassword";
import PrivateRoute from "./components/PrivateRoute";
import MenuAppBar from "./components/MenuAppBar";
import Alert from "./components/Alert";

import { mailFolderListItems } from "./components/MenuData";

import Amplify from "aws-amplify";

import { API_ROOT } from "./api-config";
import Profile from "./pages/Profile";

const drawerWidth = 255;

// TODO: Move to stylesheet
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    backgroundColor: "#f7f7f7"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#e8e8e8",
    padding: theme.spacing(3),
    minWidth: 0, // So the Typography noWrap works
    overflow: "auto"
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  render() {
    const { classes, history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/forgottenPassword" component={ForgottenPassword} />
          <Route path="/testAdvance" component={testPage} />
          <PrivateRoute
            path="/"
            render={() => (
              <Fragment>
                <MenuAppBar classes={classes} />
                <div className={classes.root}>
                  <Drawer
                    variant="permanent"
                    classes={{
                      paper: classes.drawerPaper
                    }}
                  >
                    <div className={classes.toolbar} />
                    <List>{mailFolderListItems}</List>
                  </Drawer>
                  <main className={classes.content}>
                    <Alert onRef={ref => (this.Alert = ref)} />
                    <div className={classes.toolbar} />
                    <Switch>
                      <PrivateRoute
                        exact
                        path="/dashboard"
                        component={DashboardPage}
                      />
                      <PrivateRoute
                        exact
                        path="/reports"
                        component={ReportPage}
                      />
                      <PrivateRoute exact path="/profile" component={Profile} />
                      <PrivateRoute exact path="/users" component={UsersPage} />
                      <PrivateRoute exact path="/fees" component={FeesPage} />
                      <Redirect to="/dashboard" />
                    </Switch>
                  </main>
                </div>
              </Fragment>
            )}
          />
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default withStyles(styles)(App);
