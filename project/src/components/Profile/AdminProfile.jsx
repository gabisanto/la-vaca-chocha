import React from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import genericAvatar from "../../assets/happycow6.png";
import { Button } from "@mui/material";

const AdminProfile = ({ user }) => {
  console.log("estoy en admin", user);
  return (
    <div class="cardProfile">
      <div class="card_background_img"></div>
      <div
        class="card_profile_img"
        style={{
          backgroundImage: user.avatar
            ? `url(${user.avatar})`
            : `url(${genericAvatar})`,
        }}
      ></div>
      <div class="user_details">
        <div className="profileh3">{user.name}</div>
        <p className="role">
          Rol: {user.isAdmin ? "Administrador" : "Usuario"}
        </p>
      </div>
      <div class="card_count">
        <div class="count">
          <div class="user-actions">
            <div className="profileh3">Administrar Usuarios</div>
            <Link to="/users">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 1,
                  marginTop: 2,
                  backgroundColor: "#03A696",
                  "&:hover": {
                    backgroundColor: "#04BF9D",
                    color: "#757575",
                  },
                }}
              >
                Lista de usuarios
              </Button>
            </Link>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                fontWeight: "bold",
                marginBottom: 1,
                backgroundColor: "#03A696",
                "&:hover": {
                  backgroundColor: "#04BF9D",
                  color: "#757575",
                },
              }}
            >
              Ver comentarios
            </Button>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#03A696",
                "&:hover": {
                  backgroundColor: "#04BF9D",
                  color: "#757575",
                },
              }}
            >
              Ver compras
            </Button>
          </div>
          <div class="product-actions">
            <div className="profileh3">Administrar productos</div>
            <Link to="/product">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 1,
                  marginTop: 2,
                  backgroundColor: "#03A696",
                  "&:hover": {
                    backgroundColor: "#04BF9D",
                    color: "#757575",
                  },
                }}
              >
                Lista de productos
              </Button>
            </Link>
            <Link to="/categories">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 1,
                  backgroundColor: "#03A696",
                  "&:hover": {
                    backgroundColor: "#04BF9D",
                    color: "#757575",
                  },
                }}
              >
                Lista de categorías
              </Button>
            </Link>
            <Link to="/product/create">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  fontWeight: "bold",

                  backgroundColor: "#03A696",
                  "&:hover": {
                    backgroundColor: "#04BF9D",
                    color: "#757575",
                  },
                }}
              >
                Nuevo producto
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
