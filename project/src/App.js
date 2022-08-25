import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductsCard from "./components/ProductsCard";
import Test from "./components/Test";

import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import ShowProducts from "./components/ShowProducts";
import Search from "./components/Search";
import Cart from "./components/Cart";
import CartDemo from "./components/CartDemo";
import Payment from "./components/Payment";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="cart" element={<Cart />} /> */}
          <Route path="cart" element={<CartDemo />} />
          {cart.length > 0 && <Route path="payment" element={<Payment />} />}
          <Route path="404" element={<NotFound />} />
          {/* ruta de admin */}
          <Route path="product/create" element={<CreateProduct />} />
          {/* ruta de admin */}
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="*" element={<Navigate to="404" />} />
          {/* 
          <Route path="categories"> element={<Categories />}
          <Route path="categories/:category"> element={<Category />
          {user && <Route path="profile" element={<Profile />} />}
           */}
          <Route path="product/:id" element={<ProductsCard />} />
          <Route path="product" element={<ShowProducts />} />
          <Route path="product/search" element={<Search />} />
        </Routes>
      </div>
      <div className="footer">
        <p>La vaca chocha, realizado por alumn@s de Plataforma 5</p>
      </div>
    </div>
  );
};

export default App;
