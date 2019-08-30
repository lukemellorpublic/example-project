import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { closeDialog, confirmDialog } from '../redux/actions/dialog';
import styles from '../jss/_dialog';

const DialogHandler = ({ dialog, closeDialog, confirmDialog, classes }) => {
  return (
    <Dialog open={dialog.open}>
      <DialogTitle>{dialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText classes={classes}>{dialog.content}</DialogContentText>
        <DialogActions>
          <Button onClick={closeDialog} color="default">
            Cancel
          </Button>
          <Button onClick={confirmDialog} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default connect(
  state => ({ dialog: state.dialog }),
  { closeDialog, confirmDialog }
)(withStyles(styles)(DialogHandler));
