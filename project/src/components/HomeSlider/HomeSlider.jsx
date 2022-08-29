import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./HomeSlider.css";

const dataSlider = [
  {
    id: 1,
    name: "Leche de soja",
    src: "https://www.gourmet-versand.com/img_article_v3/159194-soy-milk-soy-drink-original-with-calcium-alpro.jpg",
    price: 300,
  },
  {
    id: 2,
    name: "Nueces por kilo",
    src: "https://cdn.anscommerce.com/image/tr:h-822,w-940,cm-pad_resize/data/wonderland/21-Apr-2022/wfiw-1kg-1_1.jpg",
    price: 2400,
  },
  {
    id: 3,
    name: "Pan sin gluten",
    src: "https://cdn.newgarden.com.ar/media/catalog/product/cache/dda7253a1a2f6711745de410175d10f8/p/a/pan-schar-blanco.jpg",
    price: 350,
  },
  {
    id: 4,
    name: "Galletas marineras",
    src: "https://latinafy.com/images/thumbnails/590/590/detailed/27/ns-galletas-marineras-saladas-salty-crackers-350-g-1.jpg",
    price: 150,
  },
];

const HomeSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 10000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="App">
      <Slider {...settings}>
        {dataSlider.map((item, index) => (
          <div key={index} className="card">
            <div className="card-top">
              <img src={item.src} alt={item.name} />
            </div>

            <div className="card-bottom">
              <p>{item.name}</p>
              <p>$ {item.price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
