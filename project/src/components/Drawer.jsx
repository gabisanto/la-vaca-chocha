import * as React from "react";
import { useState, useEffect } from "react";
import { sendLogoutRequest } from "../store/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import logo from "../assets/flaticon.png";
import Drawer from "@mui/material/Drawer";
import {
  Favorite,
  AccountCircle,
  Login,
  Logout,
  HowToReg,
  Home,
  Icecream,
} from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

/* styles for the drawer */

const useStyles = makeStyles(() => {
  return {
    drawerPaper: {
      width: 240,
      backgroundColor: "#bf665e",
      paddingTop: 90,
      color: "white",
    },
  };
});

export default function TemporaryDrawer({ openStatus, stateChanger, user }) {
  /* traigo estado global cart */
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  /* configuration to make the drawer work */
  const navigate = useNavigate();
  const theme = useTheme();
  const classes = useStyles(theme);
  const [openDrawer, setOpenDrawer] = useState({
    left: false,
  });

  useEffect(() => {
    setOpenDrawer({ left: openStatus });
  }, [openStatus]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer({ [anchor]: open });
    stateChanger(open);
  };

  /* acciones de logout */
  const handleLogout = function () {
    navigate("/");

    dispatch(sendLogoutRequest(cart))
      .then(() => {
        window.localStorage.clear();
      })
      .catch((err) => console.log("Ocurrió un error", err));
  };

  /* drawer options */
  const list = (anchor) => (
    <Box sx={{ width: 250 }}>
      <div style={{ display: "flex" }}>
        <Box
          component="img"
          title="la vaca chocha"
          sx={{
            height: 60,
            margin: "0 auto",
          }}
          alt="la vaca chocha logo"
          src={logo}
        />
      </div>
      {!user.email ? (
        <List>
          <Link to="/" style={{ textDecoration: "none" }}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "black" }}>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Home"} sx={{ color: "black" }} />
            </ListItem>
          </Link>
          <Link to="/product" style={{ textDecoration: "none" }}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "black" }}>
                <Icecream />
              </ListItemIcon>
              <ListItemText primary={"Productos"} sx={{ color: "black" }} />
            </ListItem>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "black" }}>
                <Login />
              </ListItemIcon>
              <ListItemText primary={"Login"} sx={{ color: "black" }} />
            </ListItem>
          </Link>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "black" }}>
                <HowToReg />
              </ListItemIcon>
              <ListItemText sx={{ color: "black" }} primary={"Register"} />
            </ListItem>
          </Link>
        </List>
      ) : (
        <List>
          <Link to="/" style={{ textDecoration: "none" }}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "black" }}>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary={"Home"}
                sx={{ textDecorarion: "none", color: "black" }}
              />
            </ListItem>
          </Link>
          <Link to="/product" style={{ textDecoration: "none" }}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "black" }}>
                <Icecream />
              </ListItemIcon>
              <ListItemText primary={"Productos"} sx={{ color: "black" }} />
            </ListItem>
          </Link>
          <Link to="/favorites" style={{ textDecoration: "none" }}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "black" }}>
                <Favorite />
              </ListItemIcon>
              <ListItemText
                primary={"Mis favoritos"}
                sx={{ textDecorarion: "none", color: "black" }}
              />
            </ListItem>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "black" }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
                primary={"Mi perfil"}
                sx={{ textDecorarion: "none", color: "black" }}
              />
            </ListItem>
          </Link>
          <ListItem
            sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}
            onClick={handleLogout}
            style={{ textDecoration: "none" }}
          >
            <ListItemIcon sx={{ color: "black" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Salir"} />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={"left"}
        open={openDrawer["left"]}
        onClose={toggleDrawer("left", false)}
        classes={{
          paper: classes.drawerPaper,
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
