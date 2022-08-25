import axios from "axios";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import {
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia
} from "@mui/material";
import Cart from "../commons/Cart";
import { useSelector, useDispatch } from "react-redux";

const ShowProducts = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  /*  const { user } = useContext(AuthContext); */
  const [products, setProducts] = useState([]);

  // me traigo a products
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => setProducts(res.data));
  }, []);


  return (
    <div
      style={{
        backgroundColor: "#f1e9da",
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
        }}
      >
        <p style={{ textAlign: "center" }}>
          Productos
        </p>
      </Container>
      <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
        <Grid container my={4}>
          {products?.map((producto) => {
            return (
              <Grid item xs={12} sm={6} md={4} p={2} key={producto.id}>
                <Card ><Link to={`/product/${producto.id}`} style={{ textDecoration: "none" }}>
                <CardMedia
                    component="img"
                    height="70"
                    image="https://animalgourmet.com/wp-content/uploads/2017/10/semillas.jpg"
                    alt="imagen de producto"
                  />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {producto.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {producto.description}
                    </Typography>
                    <br />
                    <Typography variant="h6" color="text.secondary">
                      {producto.price}
                    </Typography>
                  </CardContent>
                  </Link>
                   <CardActions>
                    <Button
                      size="small"
                      onClick={() =>
                        dispatch({
                          type: "ADD",
                          payload: { ...producto, quantity: 1 },
                        })
                      }
                    >
                      <Cart />
                    </Button>
                    
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default ShowProducts;
