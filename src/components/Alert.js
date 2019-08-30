import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";

import MySnackbarContentWrapper from "./AlertContent";

import { closeDialog } from "../redux/actions/dialog";

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false
    };
  }

  render() {
    const { dialogOptions, dialogOpen, closeDialog } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={dialogOpen}
          autoHideDuration={6000}
          onClose={() => closeDialog()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
        >
          <MySnackbarContentWrapper
            variant={dialogOptions.type}
            message={dialogOptions.title}
            handleClose={() => closeDialog()}
          />
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { dialogOpen: state.dialog.open, dialogOptions: state.dialog };
};

export default connect(
  mapStateToProps,
  { closeDialog }
)(Alert);
