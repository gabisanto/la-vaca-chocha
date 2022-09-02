import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Container } from "@mui/material";
import Banner from "../../commons/Banner/Banner";
import AlertMessage from "../../commons/AlertMessage";
import ConfirmDialog from "../../commons/ConfirmDialog";
import { deleteProduct } from "../../store/products";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useMatches from "../../hooks/useMatches";
import FavoriteActions from "./FavoriteActions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentsActions from "./CommentsActions";

const ProductsCard = () => {
  const navigate = useNavigate();
  /* media queries */

  const matches = useMatches();

  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const cart = useSelector((state) => state.cart);
  const categories = useSelector((state) => state.categories);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // me traigo a producto por id
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((res) => res.data)
      .then((data) => {
        if (data.id) {
          setProducts(data);
        } else navigate("/404");
      })
      .catch((err) => {
        console.log("estoy en catch");
        navigate("/404");
      });
  }, [id]);

  /* status del mensaje de delete */
  const [deleteStatus, setDeleteStatus] = useState("");

  const handleDelete = (product) => {
    dispatch(deleteProduct(product))
      .then(() => {
        setDeleteStatus("success");
        setTimeout(() => {
          setDeleteStatus("");
          navigate("/product");
        }, 3000);
      })
      .catch(() => {
        setDeleteStatus("error");
        setTimeout(() => {
          setDeleteStatus("");
        }, 3000);
      });
  };

  /* experimental pop up de confirmación */

  const [openDialog, setOpenDialog] = useState(false);

  /* para saber las categorías del producto */
  if (!products.id) return "cargando";
  let prodcat = products["categoryId"];
  let productCategory = categories.filter((cat) => prodcat.includes(cat.id));

  return (
    <div className="backDetail">
      <Banner
        text={"Detalle del producto"}
        image={"https://i.blogs.es/e2f395/harinas/1366_521.jpg"}
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          padding: 5,
        }}
      >
        <Card
          sx={{
            display: "flex",
            width: "100%",
            height: matches ? 500 : "100%",
            flexDirection: matches ? null : "column",

            borderRadius: 1,
          }}
        >
          <CardMedia
            sx={{ width: matches ? "50%" : "100%", objectFit: "contain" }}
            component="img"
            image={products.image}
            alt={products.name}
          />

          <Card
            sx={{
              width: matches ? "50%" : "100%",
              padding: 5,
              borderRadius: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography fontFamily={"Acme"} fontSize={30} component="div">
                {products.name}
              </Typography>
              {user.email && (
                <CardActions style={{ padding: 0, marginBottom: 5 }}>
                  <FavoriteActions product={products} user={user} />
                </CardActions>
              )}

              <div
                style={{
                  padding: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  height: "fit-content",
                }}
              >
                {productCategory.map((cat) => (
                  <Link
                    to={`/categories/${cat.name}`}
                    key={cat.id}
                    style={{ width: 40 }}
                  >
                    <img
                      title={cat.name}
                      src={cat.image}
                      style={{
                        padding: 2,
                        height: 40,
                      }}
                      alt={cat.name}
                    />
                  </Link>
                ))}
              </div>

              <Typography
                sx={{ mb: 1.5, mt: 1.5, fontSize: 20, fontWeight: "bold" }}
                color="black"
              >
                Precio: $ {products.price}
              </Typography>
              <Typography variant="body2">
                {products.description}
                <br />
              </Typography>

              <br />
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Cantidad disponible: {products.stock}
              </Typography>
            </CardContent>
            {user.isAdmin ? (
              <CardActions sx={{ display: "flex", flexDirection: "column" }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#03A696",
                    "&:hover": {
                      backgroundColor: "#04BF9D",
                      color: "#757575",
                    },
                  }}
                  endIcon={<DeleteIcon />}
                  onClick={
                    () => setOpenDialog(true) /* handleDelete(producto) */
                  }
                >
                  Borrar
                </Button>
                <Link
                  to={`/product/edit/${products.id}`}
                  style={{ width: "100%", marginTop: 5 }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#03A696",
                      "&:hover": {
                        backgroundColor: "#04BF9D",
                        color: "#757575",
                      },
                    }}
                    endIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                </Link>
              </CardActions>
            ) : (
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#03A696",
                    "&:hover": {
                      backgroundColor: "#04BF9D",
                      color: "#757575",
                    },
                  }}
                  endIcon={<ShoppingCartIcon />}
                  onClick={() =>
                    cart.some((cartItem) => cartItem["id"] === products.id) ===
                    false
                      ? dispatch({
                          type: "ADD",
                          payload: { ...products, quantity: 1 },
                        })
                      : dispatch({ type: "REMOVE", payload: products })
                  }
                >
                  {cart.some((cartItem) => cartItem["id"] === products.id) ===
                  false
                    ? "Agregar al carrito"
                    : "Quitar del carrito"}
                </Button>
              </CardActions>
            )}
            {openDialog && (
              <ConfirmDialog
                title={"¿Desea eliminar este producto?"}
                message={"Esta acción es irreversible."}
                handleDelete={handleDelete}
                opacity={1}
                item={products}
                openDialog={openDialog}
                stateChanger={setOpenDialog}
              />
            )}
          </Card>
        </Card>
        <CommentsActions product={products} user={user} />
      </Container>

      {deleteStatus && (
        <AlertMessage
          type={deleteStatus}
          message={
            deleteStatus === "success"
              ? `Producto borrado correctamente`
              : `Hubo algún problema`
          }
        />
      )}
    </div>
  );
};

export default ProductsCard;
