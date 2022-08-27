import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../store/products";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useMatches from "../hooks/useMatches";
import AlertMessage from "../commons/AlertMessage";
import styles from "../styles/userpages.module.css";
import { TextField, Container, Box, Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const CreateProduct = () => {
  /* traigo las categorías */
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  console.log(products);

  /* inicio dispatch */
  const dispatch = useDispatch();

  /* media queries */
  const matches = useMatches();

  /* registro react hook form; envío de información a la DB */
  const [createStatus, setCreateStatus] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(createProduct(data))
      /* manejo errores */
      .then(({ payload }) => {
        if (payload.name) {
          setCreateStatus("success");
          setTimeout(() => setCreateStatus(""), 3000);
          reset();
        }
      })
      .catch(() => {
        setCreateStatus("error");
        setTimeout(() => setCreateStatus(""), 3000);
        reset();
      });
  };
  return (
    <div
      style={{
        backgroundColor: "#f1e9da",
        padding: 10,
      }}
      className="back"
    >
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
        <p style={{ textAlign: "center" }}>Nuevo producto</p>
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
              id="category-id"
              select
              label="Categoría"
              fullWidth
              SelectProps={{
                native: true,
              }}
              variant="standard"
              {...register("categoryId", {
                required: "La categoría es obligatoria",
              })}
              error={!!errors?.categoryId}
              helperText={errors?.categoryId ? errors.categoryId.message : null}
            >
              {categories.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </TextField>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <BorderColorIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="stock"
              fullWidth
              label="Stock inicial"
              variant="standard"
              {...register("stock", {
                required: "El stock es obligatorio",
              })}
              error={!!errors?.stock}
              helperText={errors?.stock ? errors.stock.message : null}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <BorderColorIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="image"
              fullWidth
              label="Link de imagen"
              variant="standard"
              {...register("image", {
                required: "La imagen es obligatoria",
              })}
              error={!!errors?.image}
              helperText={errors?.image ? errors.image.message : null}
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
        {createStatus && (
          <AlertMessage
            type={createStatus}
            message={
              createStatus === "success"
                ? `Producto creado`
                : `Por favor verificar datos ingresados`
            }
          />
        )}
      </Container>
    </div>
  );
};

export default CreateProduct;
