import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useMatches from "../hooks/useMatches";
import back from "../assets/backusers.jpg";
import AlertMessage from "../commons/AlertMessage";
import styles from "../styles/userpages.module.css";
import { TextField, Container, Box, Button } from "@mui/material";
import { AccountCircle, Password, Email } from "@mui/icons-material";

const Register = () => {
  /* comienzo useNavigate */
  const navigate = useNavigate();

  /* media queries */
  const matches = useMatches();

  /* registro react hook form; envío de información a la DB */
  const [registerStatus, setRegisterStatus] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/api/users", data)
      /* manejo errores */
      .then(({ data }) => {
        if (!data.error) {
          setRegisterStatus("success");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setRegisterStatus("error");
          setTimeout(() => setRegisterStatus(""), 3000);
          reset();
        }
      })
      .catch(() => navigate("/404"));
  };
  return (
    <div
      style={{
        backgroundImage: `url(${back})`,
      }}
      className={styles.backImg}
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
        <p style={{ textAlign: "center" }}>Nuevo usuario</p>
      </Container>
      <Container
        maxWidth={matches ? "xs" : "m"}
        sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="username"
              fullWidth
              label="Nombre de usuario"
              variant="standard"
              {...register("name", {
                required: "El nombre de usuario es obligatorio",
              })}
              error={!!errors?.username}
              helperText={errors?.username ? errors.username.message : null}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="email"
              fullWidth
              label="E-mail"
              variant="standard"
              {...register("email", {
                required: "El e-mail es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "E-mail no válido",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="password"
              fullWidth
              type="password"
              label="Contraseña"
              variant="standard"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
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
            Registrarse
          </Button>
        </form>
        {registerStatus && (
          <AlertMessage
            type={registerStatus}
            message={
              registerStatus === "success"
                ? `Cuenta creada`
                : `Por favor verificar datos ingresados`
            }
          />
        )}
      </Container>
    </div>
  );
};

export default Register;
