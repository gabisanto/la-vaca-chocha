import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Banner from "../commons/Banner/Banner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import useMatches from "../hooks/useMatches";

const MisCompras = () => {
  const user = useSelector((state) => state.user);
  const matches = useMatches();

  return (
    <div style={{ backgroundColor: "#e0e0e0", height: "130vh" }}>
      <Banner
        text={"Mis comentarios"}
        image={
          "https://www.mountainbike.es/uploads/s1/31/93/85/5/5c7fa51c0ce6943e558b4582-vas-a-correr-un-maraton-consejos-de-nutricion-natural.jpeg"
        }
      />
      <Container
        sx={{
          width: "100%",
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#e0e0e0",
          alignItems: "center",
        }}
      >
        {user.comments.length > 0 ? (
          user.comments.map((comment) => (
            <Card
              key={comment.id}
              sx={{
                display: "flex",
                width: "80%",
                height: "fit-content",
                flexDirection: "column",
                padding: 5,
                borderRadius: 0,
              }}
            >
              <Link
                to={`/product/${comment.idProduct}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: 4,
                    textDecoration: "none",
                  }}
                >
                  Producto #{comment.idProduct}{" "}
                </p>
              </Link>
              <p> {comment.comment}</p>
            </Card>
          ))
        ) : (
          <Container
            maxWidth={matches ? "xs" : "m"}
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 3,
              pl: matches ? null : 3,
              pr: matches ? null : 3,
            }}
          >
            <Card sx={{ mb: 3, width: "100%" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.primary"
                  gutterBottom
                >
                  Aún no dejaste ningún comentario.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/profile">
                  <Button size="small">Volver a perfil</Button>
                </Link>
              </CardActions>
            </Card>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default MisCompras;
