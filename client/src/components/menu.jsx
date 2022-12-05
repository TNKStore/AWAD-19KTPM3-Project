import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../utils/localStorage";

const drawerWidth = 200;

export default function SideMenu() {
  const navigate = useNavigate();

  const token = getLocalStorage("token");
  const auth = !!token;
  const sections = auth ? ["Home", "Groups", "Presentations"] : ["Home"];

  const navigateTo = (page) => {
    if (page === "Home") navigate("/");
    else if (page === "Groups") navigate("/groups");
    else if (page === "Presentations") navigate("/presentations");
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {sections.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigateTo(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
