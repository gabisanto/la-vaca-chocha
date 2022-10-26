import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../store/products";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useMatches from "../hooks/useMatches";
import AlertMessage from "../commons/AlertMessage";
import { TextField, Container, Box, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const CreateProduct = () => {
  /* para el checkbox */
  const label = { inputProps: { "aria-label": "Checkbox productos" } };
  const navigate = useNavigate();
  /* traigo las categorías */
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

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
          setTimeout(() => {
            setCreateStatus("");
            reset();
            navigate(`/product/${payload.id}`);
          }, 3000);
        }
      })
      .catch(() => {
        setCreateStatus("error");
        setTimeout(() => setCreateStatus(""), 3000);
        reset();
      });
  };
  return (
    <div className="backProd">
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
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  message: "Ingrese un precio válido",
                },
              })}
              error={!!errors?.price}
              helperText={errors?.price ? errors.price.message : null}
            />
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
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  message: "Ingrese un stock válido",
                },
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
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
            mb={2}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <BorderColorIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <div>
                Categorías
                <div style={{ width: "100%", color: "red", fontSize: 12 }}>
                  {errors.categoryId && (
                    <span>{errors.categoryId.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {categories.map((option) => (
                <div key={option.id}>
                  <Checkbox
                    {...label}
                    icon={<CheckCircleOutlineIcon sx={{ color: "#253659" }} />}
                    name={option.name}
                    checkedIcon={<CheckCircleIcon sx={{ color: "#253659" }} />}
                    value={option.id}
                    {...register("categoryId", {
                      required: {
                        value: true,
                        message: "Categoría es obligatoria",
                      },
                    })}
                  />
                  {option.name}
                </div>
              ))}
            </div>
            {/* </TextField> */}
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
