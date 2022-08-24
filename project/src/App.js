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
import Cart from "./components/Cart";
import CartDemo from "./components/CartDemo";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div>
        {/* <ProductsCard /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          <Route path="cartdemo" element={<CartDemo />} />
          <Route path="404" element={<NotFound />} />
          {/* ruta de admin */}
          <Route path="product/create" element={<CreateProduct />} />
          {/* ruta de admin */}
          <Route path="edit/:productId" element={<EditProduct />} />
          <Route path="*" element={<Navigate to="404" />} />
          {/* 
          <Route path="categories"> element={<Categories />}
          <Route path="categories/:category"> element={<Category />
          {user && <Route path="profile" element={<Profile />} />}
           */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
