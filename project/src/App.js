import React from "react";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "./store/categories";
import { getProducts } from "./store/products";
import Categories from "./components/Category/Categories";
import ProductsCard from "./components/ProductsCard.jsx";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import ShowProducts from "./components/ShowProducts";
import Search from "./components/Search";
import Profile from "./components/Profile/Index.jsx";
import CartDemo from "./components/CartDemo";
import Payment from "./components/Payment";
import Home from "./components/Home";
import Users from "./components/Users";
import Navbar from "./components/Navbar";

const App = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          {!user.email && <Route path="register" element={<Register />} />}
          {user.email && <Route path="profile" element={<Profile />} />}
          <Route path="cart" element={<CartDemo />} />
          {cart.length > 0 && <Route path="payment" element={<Payment />} />}
          <Route path="404" element={<NotFound />} />
          <Route path="categories" element={<Categories />} />
          {/* 
          
          <Route path="categories/:category"> element={<Category />
          
           */}
          <Route path="product/:id" element={<ProductsCard />} />
          <Route path="product" element={<ShowProducts />} />
          <Route path="product/search" element={<Search />} />
          {/* rutas de admin */}
          {user.isAdmin && (
            <Route path="product/create" element={<CreateProduct />} />
          )}
          {user.isAdmin && (
            <Route path="product/edit/:id" element={<EditProduct />} />
          )}
          {user.isAdmin && <Route path="users" element={<Users />} />}
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </div>
      <div className="footer">
        <p>La vaca chocha, realizado por alumn@s de Plataforma 5</p>
      </div>
    </div>
  );
};

export default App;
