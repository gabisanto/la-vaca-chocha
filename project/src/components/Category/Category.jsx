import React from "react";
import "./category.css";

const Category = ({ cat }) => {
  return (
    <div className="catMain">
      <img className="catImage" src={cat.image} alt={cat.name} />
      <p className="catName">{cat.name}</p>
    </div>
  );
};

export default Category;
