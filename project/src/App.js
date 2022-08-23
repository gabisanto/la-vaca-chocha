import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductsCard from "./components/ProductsCard";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div>
      
        <ProductsCard/>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="404" element={<NotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="404" />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
