import React from "react";
import "./banner.css";

const Banner = ({ text, image }) => {
  const imageBack = image;
  return (
    <div className="cardBanner">
      <div
        className="banner_background_img"
        style={{ backgroundImage: `url(${imageBack})` }}
      ></div>
      <div className="textBanner">{text}</div>
    </div>
  );
};

export default Banner;
