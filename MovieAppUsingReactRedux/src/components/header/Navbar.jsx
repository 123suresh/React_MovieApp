import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import CommonButton from "../common/CommonButton";
import { Link } from "react-router-dom";
import { auth } from "../../action/auth";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navbar__main: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link_set: {
    paddingLeft: "80px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  avatar: {
    marginRight: "50px",
    padding: "10px",
  },
  avatarContent: {
    textAlign: "center",
    padding: "10px",
  },
  link: {
    textDecoration: "none",
    color: "floralwhite",
    fontSize: "14px",
    textAlign: "center",
    alignItems: "center",
    paddingLeft: "50px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
  active__link: {
    color: "rgb(255, 208, 0)",
  },
}));

const ResponsiveAppBar = () => {
  const classes = useStyles();
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
  }

  const handleActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <div className={classes.navbar__main}>
      <div className={classes.link_set}>
        <Link
          onClick={() => handleActiveLink("movieList")}
          className={`${classes.link} ${
            window.location.pathname === "/movieList"
              ? classes.active__link
              : ""
          }`}
          to="/movieList"
        >
          MOVIES
        </Link>
        <Link
          onClick={() => handleActiveLink("watchList")}
          className={`${classes.link} ${
            window.location.pathname === "/watchList"
              ? classes.active__link
              : ""
          }`}
          to="/watchList"
        >
          WATCH LIST
        </Link>
      </div>
      <div className={classes.avatar}>
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
            <div className={classes.avatarContent}>
              <Typography>{decodedToken.name}</Typography>
              <hr />
              <CommonButton buttonName="Logout" onClick={handleLogout} />
            </div>
          </Menu>
        </Box>
      </div>
    </div>
  );
};
export default ResponsiveAppBar;
