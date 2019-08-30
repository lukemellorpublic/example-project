import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedToolbarHeader";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";

import { loadUsers } from "../redux/actions/user";

let counter = 0;
function createData(name, email, status, edit, username) {
  counter += 1;
  return { id: counter, name, email, status, edit, username };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  editRow: {
    textAlign: "right"
  },
  emailRow: {
    textAlign: "center"
  }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "Email address",
      selected: [],
      data: this.setupUsers(props.users),
      page: 0,
      rowsPerPage: 5
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  setupUsers = users => {
    var userList = [];
    users.forEach(user => {
      var name = "No name found",
        email,
        status = user.UserStatus;
      user.Attributes.forEach(attribute => {
        if (attribute.Name === "name") {
          name = attribute.Value;
        }
        if (attribute.Name === "email") {
          email = attribute.Value;
        }
      });
      if (user.UserStatus === "FORCE_CHANGE_PASSWORD") {
        status = "PASSWORD CHANGE REQUIRED";
      }
      userList.push(createData(name, email, status, null, user.Username));
    });
    return userList;
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentDidMount() {
    this.setupUsers(this.props.users);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: this.setupUsers(this.props.users) });
  }

  initialGrabber = word => {
    if (word.match(/[a-z]/i)) {
      if (word.match(/\b(\w)/g).join("") === "Nnf") {
        return "N/A";
      } else {
        var matches = word.match(/\b(\w)/g); // ['J','S','O','N']
        return matches.join("").toUpperCase(); // JSON
      }
    }
  };

  render() {
    const { classes, deleteUser, users, currentUser } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    if (data.length !== users.length) {
      this.setState({ data: this.setupUsers(users) });
    }

    return (
      <div className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow hover tabIndex={-1} key={n.id}>
                      <TableCell padding="checkbox">
                        <Avatar className={classes.purpleAvatar}>
                          {this.initialGrabber(n.name)}
                        </Avatar>
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell>{n.email}</TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.status}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => deleteUser(n.username)}
                          disabled={currentUser === n.email}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {users.length > 0 ? (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              ) : (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6}>
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
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  var email = "";
  if (
    state.login.currentUser.idToken &&
    state.login.currentUser.idToken.payload.email
  ) {
    email = state.login.currentUser.idToken.payload.email;
  }
  return {
    currentUser: email
  };
};

export default connect(
  state => mapStateToProps,
  { loadUsers }
)(withStyles(styles)(EnhancedTable));
