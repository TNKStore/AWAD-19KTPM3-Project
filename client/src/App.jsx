/* eslint-disable jsx-a11y/aria-role */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import "./App.css";
import { loadUserFromLocalStorage } from "./features/user/userSlice";
import ActivatePage from "./pages/activate";
import GroupDetailPage from "./pages/groupDetail";
import GroupsPage from "./pages/groups";
import InvitePage from "./pages/invite";
import LoginPage from "./pages/login";
import PresentationCollaboratePage from "./pages/presentationCollaborate";
import PresentationDetailPage from "./pages/presentationDetail";
import PresentationsPage from "./pages/presentations";
import PresentationViewPage from "./pages/presentationView";
import ProfilePage from "./pages/profile";
import RegisterPage from "./pages/register";
import Root from "./pages/root";
import DefaultRoute from "./routes/defaultRoute";
import PresentationRoute from "./routes/presentationRoute";
import PrivateRoute from "./routes/privateRoute";
import { getLocalStorage } from "./utils/localStorage";
import WebSocketContext from "./utils/webSocketContext";

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
            <Route
              path="/presentations/collaborators/:id"
              element={<PresentationCollaboratePage />}
            />
          </Route>
          <Route element={<PresentationRoute />}>
            <Route
              path="/presentations/edit/:id"
              element={
                <WebSocketContext.Provider value={socket}>
                  <PresentationDetailPage socket={socket} />
                </WebSocketContext.Provider>
              }
            />
            <Route
              path="/presentations/view"
              element={
                <WebSocketContext.Provider value={socket}>
                  <PresentationViewPage socket={socket} />
                </WebSocketContext.Provider>
              }
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
