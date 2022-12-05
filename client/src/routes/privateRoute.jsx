/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// AUTH
import jwt_decode from "jwt-decode";
import { getLocalStorage } from "../utils/localStorage";

function PrivateRoute({ role }) {
  const userTemp = getLocalStorage("user");
  const isExpired = getLocalStorage("token")
    ? jwt_decode(getLocalStorage("token")).exp * 1000 < Date.now()
    : true;

  // thêm tạm role để test chứ cái này phải từ back gửi lên
  const user = { role: "admin", ...userTemp };
  //

  const container = <Outlet />;

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
