import React from "react";
import "./profile.css";
import genericAvatar from "../../assets/happycow6.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
        <div className="profileh3">{user.name}</div>
        <p className="role">
          Rol: {user.isAdmin ? "Administrador" : "Usuario"}
        </p>
      </div>
      <div class="card_count">
        <div class="count">
          <div class="user-profile">
            <div className="profileh3">Mi historial</div>
            <Link to={`/orders/${user.id}`} style={{ textDecoration: "none" }}>
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
                Mis compras
              </Button>
            </Link>
            <Link to={`/comments`} style={{ textDecoration: "none" }}>
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
            </Link>
            <Link to="/favorites" style={{ textDecoration: "none" }}>
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
