import * as React from "react";
import Banner from "../commons/Banner/Banner";
import useMatches from "../hooks/useMatches";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";

function priceRow(qty, unit) {
  return qty * unit;
}

/* function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
} */

export default function Cart() {
  /* media queries */
  const matches = useMatches();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addition = (acc, currentvalue) => {
    return acc + currentvalue.price * currentvalue.quantity;
  };
  const invoiceSubtotal = cart.reduce(addition, 0);

  return (
    <div
      style={{ backgroundColor: "#e0e0e0", paddingBottom: 100, height: "100%" }}
    >
      <Banner
        text={"Carrito de compras"}
        image={
          "https://cocinemosjuntos.com.co/media/mageplaza/blog/post/c/o/condimentos-y-especias_1_.jpg"
        }
      />
      {cart.length === 0 ? (
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
                No hay productos en el carrito
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
          {cart.map((product) => {
            return (
              <Card key={product.id} sx={{ mb: 3, width: "100%" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="70"
                    image="https://animalgourmet.com/wp-content/uploads/2017/10/semillas.jpg"
                    alt="imagen de producto"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  disableSpacing
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <IconButton
                      onClick={() =>
                        dispatch({ type: "INCREASE", payload: product })
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    {product.quantity}
                    <IconButton
                      onClick={() => {
                        if (product.quantity > 1) {
                          dispatch({ type: "DECREASE", payload: product });
                        } else {
                          dispatch({ type: "REMOVE", payload: product });
                        }
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </div>
                  <p>$ {priceRow(product.price, product.quantity)}</p>
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      dispatch({ type: "REMOVE", payload: product })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}

          <Card sx={{ mb: 3, width: "100%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.primary"
                gutterBottom
              >
                Total: $ {invoiceSubtotal}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/payment">
                <Button size="small">Confirmar pedido</Button>
              </Link>
            </CardActions>
          </Card>
        </Container>
      )}
    </div>
  );
}
