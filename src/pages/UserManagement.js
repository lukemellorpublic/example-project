import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import People from "@material-ui/icons/People";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { withStyles } from "@material-ui/core/styles";

import CreateUser from "../components/CreateUser";
import Table from "../components/Table";
import styles from "../jss/_userManagement";
import { openDialog } from "../redux/actions/dialog";
import { loadUsers, editUser, deleteUser } from "../redux/actions/user";

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: "",
      editEmail: "",
      expanded: "usersPanel",
      editUser: true
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlePanelChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  editUserSubmit = () => {
    this.setState({
      editName: "",
      editEmail: "",
      editUser: true,
      expanded: "usersPanel"
    });
  };

  deleteUser = username => {
    this.props.openDialog("User Deleted", undefined, "error");
    this.props.deleteUser(username);
  };

  // componentWillUpdate() {
  //   this.props.loadUsers();
  // }

  reloadUsers() {
    this.props.loadUsers();
  }

  render() {
    const { classes, userDeleted, users } = this.props;
    var userIndex = users.findIndex(
      v => v.Attributes[3].Value === "luke.mellor@atomicmedia.co.uk"
    );
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
    }

    const { expanded } = this.state;
    if (userDeleted) {
      this.reloadUsers();
    }
    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === "usersPanel"}
          onChange={this.handlePanelChange("usersPanel")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>
              <People /> Users
            </h3>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table deleteUser={this.deleteUser} users={users} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <CreateUser reloadUsers={this.reloadUsers} />
      </div>
    );
  }
}

UserManagement.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  let userDeleted = false;
  if (state.users.response === "User successfully deleted") {
    userDeleted = true;
  }
  return {
    userDeleted: userDeleted,
    users: state.users.data
  };
};

export default connect(
  mapStateToProps,
  { loadUsers, editUser, deleteUser, openDialog }
)(withStyles(styles)(UserManagement));
