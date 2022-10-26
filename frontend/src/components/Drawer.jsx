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
  ListAlt,
} from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TemporaryDrawer({ openStatus, stateChanger, user }) {
  /* traigo estado global cart y categories*/
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const categories = useSelector((state) => state.categories);

  /* configuration to make the drawer work */
  const navigate = useNavigate();

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

        dispatch({ type: "RESET", payload: cart });
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
            <ListItem
              sx={{
                paddingLeft: 5,
                "&:hover": { cursor: "pointer" },
              }}
            >
              <ListItemIcon sx={{ color: "black" }}>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Home"} sx={{ color: "black" }} />
            </ListItem>
          </Link>
          <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
            <ListItemIcon sx={{ color: "black" }}>
              <ListAlt />
            </ListItemIcon>
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                backgroundColor: "#e0e0e0",
                "&:before": {
                  backgroundColor: "transparent !important",
                },
              }}
            >
              <AccordionSummary
                sx={{ backgroundColor: "#e0e0e0", border: "none", p: 0 }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ backgroundColor: "#e0e0e0", border: "none" }}>
                  Categorías
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Link to={`/categories/`} className="linksBlack">
                  <Typography style={{ fontWeight: "bold" }}>
                    Ver todas
                  </Typography>
                </Link>
                {categories.map((cat) => (
                  <Link
                    to={`/categories/${cat.name}`}
                    key={cat.id}
                    className="linksBlack"
                  >
                    <Typography>{cat.name}</Typography>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
          </ListItem>
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
          <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
            <ListItemIcon sx={{ color: "black" }}>
              <ListAlt />
            </ListItemIcon>
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                backgroundColor: "#e0e0e0",
                "&:before": {
                  backgroundColor: "transparent !important",
                },
              }}
            >
              <AccordionSummary
                sx={{ backgroundColor: "#e0e0e0", border: "none", p: 0 }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ backgroundColor: "#e0e0e0", border: "none" }}>
                  Categorías
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Link to={`/categories/`} className="linksBlack">
                  <Typography style={{ fontWeight: "bold" }}>
                    Ver todas
                  </Typography>
                </Link>
                {categories.map((cat) => (
                  <Link
                    to={`/categories/${cat.name}`}
                    key={cat.id}
                    className="linksBlack"
                  >
                    <Typography>{cat.name}</Typography>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
          </ListItem>
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
        PaperProps={{
          sx: {
            backgroundColor: "#e0e0e0",
            pt: 10,
          },
        }}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
