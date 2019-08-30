import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {},
  stickyHeader: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: "#ffffff"
  }
});

function SimpleTable(props) {
  const { classes, header, data } = props;
  return (
    <Table className={classes.table}>
      <colgroup>
        <col width="50%" />
        <col width="50%" />
      </colgroup>
      <TableHead>
        <TableRow>
          <TableCell className={classes.stickyHeader}>Date</TableCell>
          <TableCell className={classes.stickyHeader}>
            {header || "Value"}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.data.map(element => (
          <TableRow key={element.date + element.value}>
            <TableCell component="th" scope="row">
              {element.date}
            </TableCell>
            <TableCell>{element.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
