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

export default function Root() {
  return (
    <StyledEngineProvider injectFirst>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SideMenu />
        <TopBar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper
          </Typography>
        </Box>
      </Box>
    </StyledEngineProvider>
  );
}
