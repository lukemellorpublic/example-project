import React from "react";
import PropTypes from "prop-types";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  loginSpinner: {
    padding: "10%",
    height: "100%"
  },
  textBody: {
    textAlign: "center",
    color: "#989898"
  }
});

const NoData = props => {
  const { classes, text } = props;

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      className={classes.loginSpinner}
    >
      <h4 className={classes.textBody}>
        No data found for {text} <br />
        <hr />
        <ErrorOutline className={classes.progress} size={50} />
      </h4>
    </Grid>
  );
};

NoData.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoData);
