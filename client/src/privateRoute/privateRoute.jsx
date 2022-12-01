/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// AUTH
import jwt_decode from "jwt-decode";
import { Box, CssBaseline } from "@mui/material";
import { getLocalStorage } from "../utils/localStorage";
import SideMenu from "../components/menu";
import TopBar from "../components/appBar";

function PrivateRoute({ role }) {
  const userTemp = getLocalStorage("user");
  const isExpired = getLocalStorage("token")
    ? jwt_decode(getLocalStorage("token")).exp * 1000 < Date.now()
    : true;

  // thêm tạm role để test chứ cái này phải từ back gửi lên
  const user = { role: "admin", ...userTemp };
  //

  const container = (
    <Box sx={{ display: "flex", paddingTop: "64px" }}>
      <CssBaseline />
      <SideMenu />
      <TopBar />
      <Box padding="20px" width="100%">
        <Outlet />
      </Box>
    </Box>
  );

  if (user && !isExpired) {
    if (!role) {
      return container;
    } else if (role?.includes(user.role)) {
      return container;
    } else {
      return <div className="not_found">BẠN KHÔNG ĐƯỢC CẤP QUYỀN</div>;
    }
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
