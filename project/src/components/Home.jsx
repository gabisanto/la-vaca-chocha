import React from "react";
import { TextField, Container, Box, Button } from "@mui/material";

import styles from "../styles/userpages.module.css";
import back from "../assets/pikist.jpg";

const Home = () => {
  return( 
    <div
    style={{
      backgroundImage: `url(${back})`,
    }}
    className={styles.backImg}
  >
    <Container
      
      sx={{
        p: 1,
        mb: 1,
        backgroundColor: "#e0e0e0",
        borderRadius: 1,
        color: "action.active",
        fontWeight: "bold",
      }}
    >
      <p style={{ textAlign: "center" }}>Bienvenid@s</p>
    </Container>
    <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1, fontWeight: "bold",color: "action.active", }}>
    <p style={{ textAlign: "center" }}>Gracias por ingresar a nuestra tiendo Online! Aqui, en nuestra dietetica ofrecemos la mayor y mejor variedad de productos: veganos, vegetarianos, saludables, libres de gluten... todo lo que necesitas para mejorar tu calidad de vida sin perjudicar a los animales. Vos comes mejor y las vacas... chochas! </p>
       
  
         
     
       

      
    
    </Container>
  </div>
  )

};

export default Home;
