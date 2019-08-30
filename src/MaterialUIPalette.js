import { createMuiTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#025462",
      contrastText: "#fff"
    },
    secondary: {
      main: "#2FDFD2",
      contrastText: "#fff"
    }
  },
  root: {
    flexGrow: 1,
    height: 960,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: 5
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: 15,
    minWidth: 0 // So the Typography noWrap works
  },
  typography: {
    useNextVariants: true
  },
  // toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  overrides: {
    MuiTableCell: {
      // paddingDense: {
      //   padding: '4px 16px 4px 8px',
      //   paddingRight: 8
      // }
    }
  }
});

export default theme;
