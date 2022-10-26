import React from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import genericAvatar from "../../assets/happycow6.png";
import { Button } from "@mui/material";

const AdminProfile = ({ user }) => {
  return (
    <div className="cardProfile">
      <div className="card_background_img"></div>
      <div
        className="card_profile_img"
        style={{
          backgroundImage: user.avatar
            ? `url(${user.avatar})`
            : `url(${genericAvatar})`,
        }}
      ></div>
      <div className="user_details">
        <div className="profileh3">{user.name}</div>
        <p className="role">
          Rol: {user.isAdmin ? "Administrador" : "Usuario"}
        </p>
      </div>
      <div className="card_count">
        <div className="count">
          <div className="user-actions">
            <div className="profileh3">Administrar Usuarios</div>
            <Link to="/users" style={{ textDecoration: "none" }}>
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
            <Link to="/orders" style={{ textDecoration: "none" }}>
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
            </Link>
          </div>
          <div className="product-actions">
            <div className="profileh3">Administrar productos</div>
            <Link to="/product" style={{ textDecoration: "none" }}>
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
                Ver productos
              </Button>
            </Link>
            <Link to="/categories" style={{ textDecoration: "none" }}>
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
                Ver categorías
              </Button>
            </Link>
            <Link to="/product/create" style={{ textDecoration: "none" }}>
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
                Nuevo producto
              </Button>
            </Link>
            <Link to="/categories/create" style={{ textDecoration: "none" }}>
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
                Nueva categoría
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
