import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addFavorites, removeFavorites } from "../../store/user";
import { Button } from "@mui/material";
const FavoriteActions = ({ user, product }) => {
  let favoritesId = user["favorites"].map((fave) => fave.idProduct);

  const dispatch = useDispatch();
  let data = { userId: user.id, product: product };

  const handleAddFaves = () => {
    dispatch(addFavorites(data));
  };
  const handleRemoveFaves = () => {
    dispatch(removeFavorites(data));
  };
  return (
    <>
      {favoritesId.includes(product.id) ? (
        <Button
          style={{ textTransform: "none", padding: 0 }}
          onClick={(e) => {
            e.preventDefault();
            handleRemoveFaves();
          }}
        >
          <IconButton>
            <Favorite sx={{ color: "#bf665e" }} />
          </IconButton>
          <p style={{ paddingLeft: 5, color: "black" }}>Quitar de favoritos</p>
        </Button>
      ) : (
        <Button
          style={{ textTransform: "none", padding: 0 }}
          onClick={(e) => {
            e.preventDefault();
            handleAddFaves();
          }}
        >
          <IconButton>
            <FavoriteBorder sx={{ color: "#bf665e" }} />
          </IconButton>
          <p style={{ paddingLeft: 5, color: "black" }}>Agregar a favoritos</p>
        </Button>
      )}
    </>
  );
};

export default FavoriteActions;
