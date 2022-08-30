import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../store/categories";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useMatches from "../hooks/useMatches";
import AlertMessage from "../commons/AlertMessage";
import { TextField, Container, Box, Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const CreateCategory = () => {
  const navigate = useNavigate();

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
    dispatch(createCategory(data))
      /* manejo errores */
      .then(({ payload }) => {
        if (payload.name) {
          setCreateStatus("success");
          setTimeout(() => {
            setCreateStatus("");
            reset();
            navigate("/categories");
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
    <div className="backCat">
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
        <p style={{ textAlign: "center" }}>Nueva categoría</p>
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
              label="Nombre de categoría"
              variant="standard"
              {...register("name", {
                required: "El nombre de categoría es obligatorio",
              })}
              error={!!errors?.name}
              helperText={errors?.name ? errors.name.message : null}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <BorderColorIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="image"
              fullWidth
              label="Link de la imagen"
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
            Crear categoría
          </Button>
        </form>
        {createStatus && (
          <AlertMessage
            type={createStatus}
            message={
              createStatus === "success"
                ? `Categoría creada`
                : `Por favor verificar datos ingresados`
            }
          />
        )}
      </Container>
    </div>
  );
};

export default CreateCategory;
