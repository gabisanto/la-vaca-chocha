import React from "react";
import { TextField, Container, Box, Button } from "@mui/material";
import Slider from "./Slider/Slider";
import styles from "../styles/userpages.module.css";
import back from "../assets/pikist.jpg";
import HomeSlider from "./HomeSlider/HomeSlider";

const Home = () => {
  return (
    <>
      <Slider />
      <div
        style={{
          paddingBottom: 33,
          backgroundColor: "white",
        }}
      >
        <Container
          sx={{
            p: 1,
            mb: 1,
            backgroundColor: "#e0e0e0",
            borderRadius: 1,
            color: "action.active",
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontFamily: "Mali",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Bienvenid@s
          </p>
        </Container>
        <Container
          sx={{
            p: 5,
            backgroundColor: "#e0e0e0",
            borderRadius: 1,
            fontWeight: "bold",
            color: "action.active",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontFamily: "Mali",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Gracias por ingresar a nuestra tiendo Online! Aqui, en nuestra
            dietetica ofrecemos la mayor y mejor variedad de productos: veganos,
            vegetarianos, saludables, libres de gluten... todo lo que necesitas
            para mejorar tu calidad de vida sin perjudicar a los animales. Vos
            comes mejor y las vacas... chochas!{" "}
          </p>
        </Container>
        <HomeSlider />
      </div>
    </>
  );
};

export default Home;
