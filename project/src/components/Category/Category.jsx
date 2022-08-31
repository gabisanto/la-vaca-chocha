import React from "react";
import "./category.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteActions from "./DeleteActions";
import EditActions from "./EditActions";

const Category = ({ cat }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="catMain">
      <img className="catImage" src={cat.image} alt={cat.name} />
      <p className="catName">{cat.name}</p>
      {user.isAdmin && (
        <>
          <DeleteActions cat={cat} />
          <Link to={`/categories/edit/${cat.id}`}>
            <EditActions cat={cat} />
          </Link>
        </>
      )}
    </div>
  );
};

export default Category;
