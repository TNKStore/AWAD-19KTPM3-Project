/* eslint-disable no-unused-vars */
import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { deleteUser } from "../features/user/userSlice";
import { getLocalStorage } from "../utils/localStorage";

export default function TopBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { socket } = props;

  // const user = useSelector((state) => state.user?.userInfo);
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");
  const auth = !!token;

  let content = "";
  let shouldShowBackButton = true;
  const currentRoute = window.location.pathname;
  switch (currentRoute) {
    case "/":
      content = `Hi, ${user?.firstName}`;
      shouldShowBackButton = false;
      break;
    case "/groups":
      content = "Groups";
      shouldShowBackButton = false;
      break;
    case "/profile":
      content = "Profile";
      shouldShowBackButton = false;
      break;
    case "/presentations":
      content = "Presentations";
      shouldShowBackButton = false;
      break;
    default:
      break;
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(deleteUser());
    navigate("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "64px" }}
    >
      <Toolbar display="flex">
        {shouldShowBackButton && <ArrowBackIcon onClick={handleBack} />}
        {!shouldShowBackButton && (
          <ArrowBackIcon sx={{ display: "none" }} onClick={handleBack} />
        )}
        {shouldShowBackButton && <Box sx={{ width: 176 }} />}
        {!shouldShowBackButton && <Box sx={{ width: 200 }} />}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {content}
        </Typography>
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
        {!auth && (
          <div>
            <Button color="inherit" href="/login">
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  socket: PropTypes.objectOf(PropTypes.shape)
};

TopBar.defaultProps = {
  socket: null
};
