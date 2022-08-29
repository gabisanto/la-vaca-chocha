import React from "react";
import { useSelector } from "react-redux";
import Banner from "../../commons/Banner/Banner";
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
      {/* acá va el map */}
    </div>
  );
};

export default Categories;
