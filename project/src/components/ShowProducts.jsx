import { useState } from "react";
import SelectFilter from "../commons/SelectFilter";
import Banner from "../commons/Banner/Banner";
import FavoriteActions from "./ProductsCard/FavoriteActions";
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
  Pagination,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";

const ShowProducts = () => {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [filterProducts, setFilterProducts] = useState([]);

  //PAGINATION

  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 5;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = filterProducts.slice(
    pagesVisited,
    pagesVisited + productsPerPage
  );
  const changePage = (selected) => {
    setPageNumber(selected.target.textContent - 1);
  };

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

  return (
    <div style={{ backgroundColor: "#e0e0e0", paddingBottom: 30 }}>
      <Banner
        text={"Nuestros productos"}
        image={
          "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/e445a425-4b26-4cc8-8dac-a12e52667df7?w=90&h=90"
        }
      />
      <Container sx={{ p: "0 5", backgroundColor: "#e0e0e0", borderRadius: 1 }}>
        <SelectFilter
          /* products={products} */
          label={"Ordenar por"}
          stateChanger={setFilterProducts}
        />
        <Grid container my={4} sx={{ mb: 0 }}>
          {displayProducts?.map((producto) => {
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
                    opacity={0.5}
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

      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        onChange={changePage}
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
        hidePrevButton
        hideNextButton
      />
    </div>
  );
};

export default ShowProducts;
