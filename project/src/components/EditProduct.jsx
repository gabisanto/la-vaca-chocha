import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useMatches from "../hooks/useMatches";
import AlertMessage from "../commons/AlertMessage";
import styles from "../styles/userpages.module.css";
import { TextField, Container, Box, Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CircularProgress from "@mui/material/CircularProgress";

const EditProduct = () => {
  /* starting navigate */
  const navigate = useNavigate();
  const { id } = useParams();
  /* media queries */
  const matches = useMatches();
  const [product, setProduct] = useState({});
  const [editStatus, setEditStatus] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((data) => {
        setProduct(data.data);
      })
      .catch(() => console.log("Error"));
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    /* axios
       .post("http://localhost:3001/api/products", data) */
    /* manejo errores */
    /* .then(({ data }) => {
         if (data.name) {
           console.log(data, "esto es data");
           setCreateStatus("success");
           setTimeout(() => setCreateStatus(""), 3000);
           reset();
         }
       })
       .catch(() => {
         setCreateStatus("error");
         setTimeout(() => setCreateStatus(""), 3000);
         reset();
       }); */
  };

  if (!product.name) return <CircularProgress color="success" />;

  return (
    <div
      style={{
        backgroundColor: "#f1e9da",
      }}
      className={styles.backImg}
    >
      {console.log(product.name)}
      <Container
        maxWidth={matches ? "xs" : "m"}
        sx={{
          p: 1,
          mb: 1,
          backgroundColor: "#e0e0e0",
          borderRadius: 1,
          color: "action.active",
          fontWeight: "bold",
        }}
      >
        <p style={{ textAlign: "center" }}>Editar producto</p>
      </Container>
      <Container
        maxWidth={matches ? "xs" : "m"}
        sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <BorderColorIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="name"
              fullWidth
              label="Nombre de producto"
              variant="standard"
              defaultValue={product.name}
              {...register("name", {
                required: "El nombre de producto es obligatorio",
              })}
              error={!!errors?.name}
              helperText={errors?.name ? errors.name.message : null}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <BorderColorIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="description"
              fullWidth
              defaultValue={product?.description}
              label="Descripción"
              variant="standard"
              {...register("description", {
                required: "La descripción es obligatoria",
              })}
              error={!!errors?.description}
              helperText={
                errors?.description ? errors.description.message : null
              }
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <BorderColorIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="price"
              fullWidth
              defaultValue={product?.price}
              label="Precio"
              variant="standard"
              {...register("price", {
                required: "El precio es obligatorio",
              })}
              error={!!errors?.price}
              helperText={errors?.price ? errors.price.message : null}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <BorderColorIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="category"
              fullWidth
              label="Categoría"
              variant="standard"
              defaultValue={product?.category}
              {...register("category", {
                required: "La categoría es obligatoria",
              })}
              error={!!errors?.category}
              helperText={errors?.category ? errors.category.message : null}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <BorderColorIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="stock"
              fullWidth
              label="Stock inicial"
              defaultValue={product?.stock}
              variant="standard"
              {...register("stock", {
                required: "El stock es obligatorio",
              })}
              error={!!errors?.stock}
              helperText={errors?.stock ? errors.stock.message : null}
            />
          </Box>

          <Button
            variant="contained"
            type="submit"
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
          >
            Crear producto
          </Button>
        </form>
        {editStatus && (
          <AlertMessage
            type={editStatus}
            message={
              editStatus === "success"
                ? `Producto modificado`
                : `Por favor verificar datos ingresados`
            }
          />
        )}
      </Container>
    </div>
  );
};

export default EditProduct;
