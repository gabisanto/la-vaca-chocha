import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
          <Typography
            variant="h5"
            component="div"
            textAlign="left"
            sx={{ flexGrow: 1 }}>
            La Vaca Chocha
          </Typography>
          </Link>
          <Stack direction="row" spacing={4}>
            <Button color="inherit">
              {" "}
              <AssignmentIndIcon />
              registrarse{" "}
            </Button>
            <Button color="inherit">
              <LoginIcon /> LOGIN
            </Button>
            <Link to="/product" className="links">
              <Button color="inherit">
                <InventoryIcon /> productos
              </Button>
            </Link>
            <Link to="/cartdemo">
            <Button color="inherit">
              <ShoppingCartIcon /> carrito
            </Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
// 1) npm install @mui/material @emotion/react @emotion/styled
/*  2)"esto va en index.js arriba del title"  =====> 
 
<link rel="stylesheet"
 href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>  

3) instalar iconos ====> npm install @mui/icons-material
*/
