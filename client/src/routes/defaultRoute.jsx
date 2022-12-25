/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
import React from "react";
import { Outlet } from "react-router-dom";

// AUTH
import { Box, CssBaseline } from "@mui/material";
import SideMenu from "../components/menu";
import TopBar from "../components/appBar";
import QuickChat from "../components/QuickChat";

function DefaultRoute() {
  return (
    <Box sx={{ display: "flex", paddingTop: "64px" }}>
      <CssBaseline />
      <TopBar />
      <SideMenu />
      <Box padding="20px" width="100%">
        <Outlet />
      </Box>
      <QuickChat />
    </Box>
  );
}

export default DefaultRoute;
