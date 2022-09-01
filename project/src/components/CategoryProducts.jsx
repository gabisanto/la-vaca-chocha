import { useState } from "react";
import useMatches from "../hooks/useMatches";
import FavoriteActions from "./ProductsCard/FavoriteActions";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../commons/Banner/Banner";
import AlertMessage from "../commons/AlertMessage";
import ConfirmDialog from "../commons/ConfirmDialog";
import { deleteProduct } from "../store/products";
import { Link } from "react-router-dom";
import {
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const matches = useMatches();

  const isolatedCat = categories.find((cat) => cat.name === category);

  const dispatch = useDispatch();

  /* status del mensaje de delete */
  const [deleteStatus, setDeleteStatus] = useState("");

  const handleDelete = (product) => {
    dispatch(deleteProduct(product))
      .then(() => {
        setDeleteStatus("success");
        setTimeout(() => {
          setDeleteStatus("");
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

  if (isolatedCat === undefined) return navigate("/404");

  const productsCategory = products.filter((product) =>
    product["categoryId"].includes(isolatedCat.id)
  );

  if (productsCategory.length === 0)
    return (
      <div
        style={{
          backgroundColor: "#e0e0e0",
          paddingBottom: 30,
          height: "100vh",
        }}
      >
        <Banner
          text={isolatedCat.name}
          image={
            "https://twigscafe.com/wp-content/uploads/2021/07/tea-in-spoons.jpg"
          }
        />
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
                No hay productos en la categoría
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/categories">
                <Button size="small">Ir a categorías</Button>
              </Link>
            </CardActions>
          </Card>
        </Container>
      </div>
    );

  return (
    <div style={{ backgroundColor: "#e0e0e0", paddingBottom: 30 }}>
      <Banner
        text={isolatedCat.name}
        image={
          "https://twigscafe.com/wp-content/uploads/2021/07/tea-in-spoons.jpg"
        }
      />
      <Container sx={{ p: "0 5", backgroundColor: "#e0e0e0", borderRadius: 1 }}>
        <Grid container my={4} sx={{ mb: 0 }}>
          {productsCategory?.map((producto) => {
            return (
              <Grid item xs={12} sm={6} md={4} p={2} key={producto.id}>
                <Card>
                  <Link
                    to={`/product/${producto.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardMedia
                      component="img"
                      height="70"
                      image="https://animalgourmet.com/wp-content/uploads/2017/10/semillas.jpg"
                      alt="imagen de producto"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ color: "black" }}
                        fontFamily={"Acme"}
                      >
                        {producto.name}
                      </Typography>
                      {user.email && (
                        <CardActions
                          style={{
                            padding: 0,
                            marginBottom: 5,
                            color: "black",
                          }}
                          onClick={(e) => e.preventDefault()}
                        >
                          <FavoriteActions product={producto} user={user} />
                        </CardActions>
                      )}
                      <Typography variant="body2" color="text.secondary">
                        {producto.description}
                      </Typography>
                      <br />
                      <Typography variant="h6" color="text.secondary">
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          $ {producto.price}
                        </p>
                      </Typography>
                    </CardContent>
                  </Link>
                  {user.isAdmin ? (
                    <CardActions
                      sx={{ display: "flex", flexDirection: "column" }}
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
                        endIcon={<DeleteIcon />}
                        onClick={
                          () => setOpenDialog(true) /* handleDelete(producto) */
                        }
                      >
                        Borrar producto
                      </Button>
                      <Link
                        to={`/product/edit/${producto.id}`}
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
                          Editar producto
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
                          cart.some(
                            (cartItem) => cartItem["id"] === producto.id
                          ) === false
                            ? dispatch({
                                type: "ADD",
                                payload: { ...producto, quantity: 1 },
                              })
                            : dispatch({ type: "REMOVE", payload: producto })
                        }
                      >
                        {cart.some(
                          (cartItem) => cartItem["id"] === producto.id
                        ) === false
                          ? "Agregar al carrito"
                          : "Quitar del carrito"}
                      </Button>
                    </CardActions>
                  )}
                </Card>
                {openDialog && (
                  <ConfirmDialog
                    title={"¿Desea eliminar este producto?"}
                    message={"Esta acción es irreversible."}
                    handleDelete={handleDelete}
                    opacity={0.3}
                    item={producto}
                    openDialog={openDialog}
                    stateChanger={setOpenDialog}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
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

export default CategoryProducts;
