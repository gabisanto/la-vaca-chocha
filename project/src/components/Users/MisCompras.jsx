import { React, useState } from "react";
import { useSelector } from "react-redux";
import Banner from "../../commons/Banner/Banner";

import { Container, Grid, Pagination } from "@mui/material";
import useMatches from "../../hooks/useMatches";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";




const MisCompras = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  let idFaves = user["favorites"].map((fav) => fav.idProduct);
  let faveProds = products.filter((product) => idFaves.includes(product.id));
  const matches = useMatches();
  //PAGINATION

  
  return (
    <div style={{ backgroundColor: "#e0e0e0", paddingBottom: 30 }}>
      <Banner
        text={"Mis compras"}
        image={"https://i.blogs.es/ca628a/batidos/1366_2000.jpg"}
      />
      {faveProds.length === 0 ? (
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
            pb: 10,
          }}
        >
          <Card sx={{ mb: 3, width: "100%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.primary"
                gutterBottom
              >
                No tiene favoritos
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/product">
                <Button size="small">Ver productos</Button>
              </Link>
            </CardActions>
          </Card>
        </Container>
      ) : (
        <>
          <Container
            sx={{ p: "0 5", backgroundColor: "#e0e0e0", borderRadius: 1 }}
          >
          {/*   <Grid container my={4} sx={{ mb: 0 }}>
              {displayProducts?.map((fave) => (
                <CardFavorite producto={fave} />
              ))}
            </Grid> */}
          </Container>
         
        </>
      )}
    </div>
  );
};

export default MisCompras;