import { useState, React } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../assets/flaticon.png";
import useMatches from "../hooks/useMatches";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import Drawer from "./Drawer";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

/* styles for the navbar */

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  /* para saber el total de elementos del carrito */
  const cart = useSelector((state) => state.cart);
  const addition = (acc, currentvalue) => {
    return acc + currentvalue.quantity;
  };
  const total = cart.reduce(addition, 0);

  /* media queries */
  const matches = useMatches();

  /* funcionalidades del drawer izquierdo */

  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  /* funcionalidad del search */

  const user = useSelector((state) => state.user);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const resp = await axios.get(
        `http://localhost:3001/api/products/search/${data.searchInput}`
      );

      const results = await resp.data;
      navigate("/product/search", { state: { results } });
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#bf665e" }}
          elevation={0}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: matches ? 60 : 50,
                    pr: matches ? 3 : 2,
                  }}
                  alt="Your logo."
                  src={logo}
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" } }}
                  fontFamily={"Pacifico"}
                  fontSize={32}
                >
                  La vaca chocha
                </Typography>
              </div>
            </Link>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>

                <StyledInputBase
                  label="searchInput"
                  name="searchInput"
                  placeholder="Buscar…"
                  inputProps={{ "aria-label": "search" }}
                  {...register("searchInput")}
                />
              </Search>
            </form>
            <Box sx={{ flexGrow: 1 }} />
            <Link to="/cart">
              <Box sx={{ display: "flex", color: "white" }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="cart"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Box>
            </Link>
            <span
              className="badge badge-warning"
              id="lblCartCount"
              style={{ textDecoration: "none" }}
            >
              {total}
            </span>
          </Toolbar>
        </AppBar>
        <Drawer openStatus={open} user={user} stateChanger={setOpen} />
      </Box>
    </>
  );
};

export default Navbar;
