import React from "react";
import PropTypes from "prop-types";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { red, amber, green, lightBlue } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = {
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: red[500]
  },
  info: {
    backgroundColor: lightBlue[500]
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20,
    paddingRight: "12px"
  },
  iconCross: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
};

const MySnackbarContentWrapper = props => {
  const { classes, message, handleClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classes[variant]}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classes.icon} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => handleClose()}
        >
          <CloseIcon className={classes.iconCross} />
        </IconButton>
      ]}
      {...other}
    />
  );
};

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

export default withStyles(useStyles1)(MySnackbarContentWrapper);
