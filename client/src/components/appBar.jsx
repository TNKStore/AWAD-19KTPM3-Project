import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/user/userSlice";
import { getLocalStorage } from "../utils/localStorage";

const drawerWidth = 300;

export default function TopBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.user?.userInfo);
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");
  const auth = !!token;

  let content = "";
  const currentRoute = window.location.pathname;
  switch (currentRoute) {
    case "/":
      content = `Hi, ${user?.firstName}`;
      break;
    case "/groups":
      content = "Groups";
      break;
    case "/profile":
      content = "Profile";
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

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
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
