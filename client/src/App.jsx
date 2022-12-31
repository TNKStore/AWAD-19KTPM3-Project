/* eslint-disable jsx-a11y/aria-role */
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Root from "./pages/root";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import PrivateRoute from "./routes/privateRoute";
import { loadUserFromLocalStorage } from "./features/user/userSlice";
import GroupsPage from "./pages/groups";
import GroupDetailPage from "./pages/groupDetail";
import ProfilePage from "./pages/profile";
import ActivatePage from "./pages/activate";
import InvitePage from "./pages/invite";
import DefaultRoute from "./routes/defaultRoute";
import PresentationRoute from "./routes/presentationRoute";
import PresentationsPage from "./pages/presentations";
import PresentationDetailPage from "./pages/presentationDetail";
import PresentationViewPage from "./pages/presentationView";
import { getLocalStorage } from "./utils/localStorage";

function App() {
  const [socket, setSocket] = useState(null);

  const dispatch = useDispatch();

  const user = getLocalStorage("user");
  const token = getLocalStorage("token");

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, []);

  useEffect(() => {
    const connectSocket = async () => {
      if (!user) return;

      if (!socket) {
        const newSocket = io(process.env.REACT_APP_DOMAIN, {
          extraHeaders: {
            token
          }
        });
        setSocket(newSocket);
      }
    };

    connectSocket();

    return () => {
      if (!user) return;
      socket?.disconnect();
    };
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute role={["admin", "user"]} />}>
          <Route element={<DefaultRoute />}>
            {/* chỉ những người có role tương ứng mới vào được */}
            <Route path="/" element={<Root />} exact />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/groups/:id" element={<GroupDetailPage />} />
            <Route path="/presentations" element={<PresentationsPage />} />
          </Route>
          <Route element={<PresentationRoute />}>
            <Route
              path="/presentations/edit/:id"
              element={<PresentationDetailPage socket={socket} />}
            />
            <Route
              path="/presentations/view"
              element={<PresentationViewPage socket={socket} />}
            />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activate" element={<ActivatePage />} />
        <Route path="/group/invite" element={<InvitePage />} />
      </Routes>
    </Router>
  );
}

export default App;
