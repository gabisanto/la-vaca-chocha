import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { editCategory } from "../store/categories";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useMatches from "../hooks/useMatches";
import AlertMessage from "../commons/AlertMessage";
import { TextField, Container, Box, Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const categories = useSelector((state) => state.categories);
  let category = categories.find((cat) => cat["id"] === Number(id));

  /* inicio dispatch */
  const dispatch = useDispatch();

  /* media queries */
  const matches = useMatches();

  /* registro react hook form; envío de información a la DB */
  const [editStatus, setEditStatus] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(editCategory({ ...data, id }))
      /* manejo errores */
      .then(({ payload }) => {
        if (payload.name) {
          setEditStatus("success");
          setTimeout(() => {
            setEditStatus("");
            navigate("/categories");
          }, 3000);
        }
      })
      .catch(() => {
        setEditStatus("error");
        setTimeout(() => setEditStatus(""), 3000);
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
        <p style={{ textAlign: "center" }}>Editar categoría</p>
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
              defaultValue={category.name}
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
              defaultValue={category.image}
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
            Editar categoría
          </Button>
        </form>
        <Link to="/categories">
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              fontWeight: "bold",
              mt: 1,
              backgroundColor: "#03A696",
              "&:hover": {
                backgroundColor: "#04BF9D",
                color: "#757575",
              },
            }}
          >
            Volver
          </Button>
        </Link>
        {editStatus && (
          <AlertMessage
            type={editStatus}
            message={
              editStatus === "success"
                ? `Categoría editada`
                : `Por favor verificar datos ingresados`
            }
          />
        )}
      </Container>
    </div>
  );
};

export default EditCategory;
