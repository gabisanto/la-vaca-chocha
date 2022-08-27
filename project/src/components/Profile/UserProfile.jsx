import React from "react";
import "./profile.css";
import genericAvatar from "../../assets/happycow6.png";
import { Button } from "@mui/material";

const UserProfile = ({ user }) => {
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
        <h3>{user.name}</h3>
        <p>Rol: {user.isAdmin ? "Administrador" : "Usuario"}</p>
      </div>
      <div class="card_count">
        <div class="count">
          <div class="user-profile">
            <h3>Mi historial</h3>
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
              Mis compras
            </Button>

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
              Mis comentarios
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
              Mis favoritos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;