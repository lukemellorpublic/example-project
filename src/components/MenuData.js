import React from "react";
import { Link } from "react-router-dom";

// material ui
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertChart from "@material-ui/icons/InsertChart";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Dashboard from "@material-ui/icons/Dashboard";
import Group from "@material-ui/icons/Group";

export const mailFolderListItems = (
  <div style={{ paddingTop: "15px" }}>
    <Link to="/dashboard" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/reports" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <InsertChart />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </Link>
    <Link to="/users" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <Group />
        </ListItemIcon>
        <ListItemText primary="User Management" />
      </ListItem>
    </Link>
    <Link to="/fees" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <AttachMoney />
        </ListItemIcon>
        <ListItemText primary="Fees" />
      </ListItem>
    </Link>
  </div>
);
