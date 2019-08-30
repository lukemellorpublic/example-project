import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { dismissError } from '../redux/actions/errors';
import styles from '../jss/_errors';

const ErrorHandler = ({ error, dismissError, classes }) => {
  return (
    <Dialog open={error.openPopup}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText classes={classes}>{error.currentError}</DialogContentText>
        <DialogActions>
          <Button onClick={dismissError} color="primary">
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default connect(
  state => ({ error: state.error }),
  { dismissError }
)(withStyles(styles)(ErrorHandler));
