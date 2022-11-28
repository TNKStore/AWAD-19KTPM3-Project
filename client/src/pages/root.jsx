import React from "react";
import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  Toolbar,
  Typography
} from "@mui/material";
import TopBar from "../components/appBar";
import SideMenu from "../components/menu";

export default function Root(props) {
  return (
    
      <Box
        component="main"
      >
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper
        </Typography>
      </Box>
    
  );
}
