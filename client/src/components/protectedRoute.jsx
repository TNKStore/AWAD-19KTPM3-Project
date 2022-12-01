/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../utils/localStorage";

export default function ProtectedRoute({ children }) {
  const token = getLocalStorage("token");
  const { isExpired } = useJwt(token || {});

  if (isExpired) {
    return <Navigate to="/login" />;
  }
  return children;
}
