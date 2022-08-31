import React from "react";
import { useSelector } from "react-redux";
import FavoriteActions from "./ProductsCard/FavoriteActions";
import Banner from "../commons/Banner/Banner";
const UserFavorites = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  let idFaves = user["favorites"].map((fav) => fav.idProduct);
  let faveProds = products.filter((product) => idFaves.includes(product.id));
  console.log(faveProds);
  return (
    <div>
      <Banner
        text={"Mis favoritos"}
        image={"https://i.blogs.es/ca628a/batidos/1366_2000.jpg"}
      />
    </div>
  );
};

export default UserFavorites;
