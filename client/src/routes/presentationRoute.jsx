/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
import React from "react";
import PropTypes from "prop-types";

import { Outlet } from "react-router";
import { Box, CssBaseline } from "@mui/material";

function PresentationRoute(props) {
  const { socket } = props;

  return (
    <Box sx={{ marginTop: "64px" }}>
      <CssBaseline />
      <Outlet />
    </Box>
  );
}

PresentationRoute.propTypes = {
  socket: PropTypes.objectOf(PropTypes.shape)
};

PresentationRoute.defaultProps = {
  socket: null
};

export default PresentationRoute;
