/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
import React from "react";

import { Outlet } from "react-router";
import { Box, CssBaseline } from "@mui/material";
import TopBar from "../components/appBar";

function PresentationRoute() {
  return (
    <Box sx={{ display: "flex", paddingTop: "64px" }}>
      <CssBaseline />
      <TopBar />
      <Outlet />
    </Box>
  );
}

export default PresentationRoute;
