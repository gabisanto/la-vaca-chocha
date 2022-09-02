import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Banner from "../../commons/Banner/Banner";
import axios from "axios";
import OrdersTable from "./OrdersTable";
import OrdersTableResp from "./OrdersTableResp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import useMatches from "../../hooks/useMatches";

const MisCompras = () => {
  const user = useSelector((state) => state.user);
  const matches = useMatches();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/orders/${user.id}`)
      .then((res) => res.data)
      .then((data) => {
        setOrders(data);
        console.log("data", data);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#e0e0e0", height: "130vh" }}>
      <Banner
        text={"Mis compras"}
        image={
          "https://vinomanos.com/wp-content/uploads/2021/05/pexels-anna-tarazevich-7771973-min.jpg"
        }
      />
      {orders.length > 0 ? (
        matches ? (
          <div style={{ padding: 30 }}>
            <OrdersTable elements={orders} />
          </div>
        ) : (
          <div style={{ padding: 30 }}>
            <OrdersTableResp elements={orders} />
          </div>
        )
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
                Aún no hay órdenes.
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/product">
                <Button size="small">Ver productos</Button>
              </Link>
            </CardActions>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default MisCompras;
