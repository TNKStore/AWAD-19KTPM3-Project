/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
import React from "react";
import PropTypes from "prop-types";

import { Outlet } from "react-router";
import { Box, CssBaseline } from "@mui/material";
import TopBar from "../components/appBar";

function PresentationRoute(props) {
  const { socket } = props;

  return (
    <Box sx={{ marginTop: "64px" }}>
      <CssBaseline />
      <TopBar socket={socket} />
      <Outlet />
    </Box>
  );
}

PresentationRoute.propTypes = {
  socket: PropTypes.shape
};

PresentationRoute.defaultProps = {
  socket: {}
};

export default PresentationRoute;
