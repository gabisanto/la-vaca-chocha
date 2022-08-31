import React from "react";
import { useSelector } from "react-redux";
import Banner from "../../commons/Banner/Banner";
import Category from "./Category";
import { Link } from "react-router-dom";
import "./category.css";
const Categories = () => {
  const categories = useSelector((state) => state.categories);
  console.log(categories);
  return (
    <div style={{ backgroundColor: "#e0e0e0", paddingBottom: 30 }}>
      <Banner
        text={"Nuestras categorías"}
        image={
          "https://alpina.com/media/mageplaza/blog/post/d/e/descubre-los-cereales-indipensables.jpg"
        }
      />
      <div className="catContainer">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            className="linksBlack"
            to={`/categories/${cat.name}`}
          >
            <Category cat={cat} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
