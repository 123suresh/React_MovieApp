import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CommonButton from "../common/CommonButton";
import { Navigate, Link } from "react-router-dom";
import "./Navbar.scss";
import { auth } from "../../action/auth";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const authValue = useSelector((state) => state.auth.isAuthenticated);

  const decodedToken = jwt_decode(authValue);

  const [activeLink, setActiveLink] = React.useState(null);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogout() {
    dispatch(auth(false));
    // dispatch(auth());
  }

  const handleActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="navbar__main">
      <div className="link_set">
        <Link
          onClick={() => handleActiveLink("movieList")}
          className={
            window.location.pathname === "/movieList"
              ? "link active__link"
              : "link"
          }
          to="/movieList"
        >
          MOVIES
        </Link>
        <Link
          onClick={() => handleActiveLink("watchList")}
          className={
            window.location.pathname === "/watchList"
              ? "link active__link"
              : "link"
          }
          to="/watchList"
        >
          WATCH LIST
        </Link>
      </div>
      <div className="avatar">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="admin profile image"
                src="https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png"
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <div className="avatar__content">
              <Typography>{decodedToken.name}</Typography>
              <hr />
              <CommonButton buttonName="logout" onClick={handleLogout} />
            </div>
          </Menu>
        </Box>
      </div>
    </div>
  );
};
export default ResponsiveAppBar;
