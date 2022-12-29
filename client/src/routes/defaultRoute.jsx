/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
import React from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

// AUTH
import { Box, CssBaseline } from "@mui/material";
import SideMenu from "../components/menu";
import TopBar from "../components/appBar";

function DefaultRoute(props) {
  const { socket } = props;

  return (
    <Box sx={{ display: "flex", paddingTop: "64px" }}>
      <CssBaseline />
      <TopBar socket={socket} />
      <SideMenu />
      <Box padding="20px" width="100%">
        <Outlet />
      </Box>
    </Box>
  );
}

DefaultRoute.propTypes = {
  socket: PropTypes.shape
};

DefaultRoute.defaultProps = {
  socket: {}
};

export default DefaultRoute;
