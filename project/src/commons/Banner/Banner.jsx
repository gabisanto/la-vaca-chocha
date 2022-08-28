import React from "react";
import "./banner.css";

const Banner = ({ text, image }) => {
  const imageBack = image;
  return (
    <div className="cardBanner">
      <div
        class="banner_background_img"
        style={{ backgroundImage: `url(${imageBack})` }}
      ></div>
      <div class="textBanner">{text}</div>
    </div>
  );
};

export default Banner;
