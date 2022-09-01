import React from "react";
import cow from "../../assets/cow-ufo.jpg";
import "./notFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mainDivNot">
      <div className="divImageNot">
        <img src={cow} alt="vaquita volando con un ovni" />
      </div>
      <div className="divTextNot">
        <p>
          Error 404. ¿Estás perdido? Nosotros te ayudamos. Podes ingresar al
          sitio{" "}
          <Link className="linksNot" to="/login">
            aquí
          </Link>{" "}
          o ir a ver nuestros{"  "}
          <Link className="linksNot" to="/product">
            productos
          </Link>
          {"  "}
          aquí.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
