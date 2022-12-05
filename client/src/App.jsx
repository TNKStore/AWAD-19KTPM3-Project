/* eslint-disable jsx-a11y/aria-role */
import React, { useEffect } from "react";
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
import PresentationPage from "./pages/presentation";
import PresentationRoute from "./routes/presentationRoute";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, []);

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
          </Route>
          <Route element={<PresentationRoute />}>
            <Route path="/presentations" element={<PresentationPage />} />
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
