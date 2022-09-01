import { useState } from "react";
import useMatches from "../hooks/useMatches";
import back from "../assets/backusers.jpg";
import AlertMessage from "../commons/AlertMessage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { sendLoginRequest } from "../store/user";
import { TextField, Container, Box, Button } from "@mui/material";
import { AccountCircle, Visibility } from "@mui/icons-material";
import styles from "../styles/userpages.module.css";

const Login = () => {
  /* media queries custom hook */
  const matches = useMatches();

  /* inicio proceso de login */
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* configuración usando react hook form */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  /* realizando el login */
  const onSubmit = (data) => {
    dispatch(sendLoginRequest(data))
      .then(({ payload }) => {
        if (payload) {
          setLoginStatus("success");
          if (payload.cart.products && payload.cart.products.length > 0) {
            dispatch({ type: "SEED CART", payload: payload.cart.products });
          } else console.log("no cart");
          setTimeout(() => {
            setLoginStatus("");
            navigate("/profile");
          }, 3000);
        } else {
          setLoginStatus("error");
          setTimeout(() => setLoginStatus(""), 3000);
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
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
        <p style={{ textAlign: "center" }}>Ingreso al sitio</p>
      </Container>
      <Container
        maxWidth={matches ? "xs" : "m"}
        sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
            mb={2}
          >
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="email"
              fullWidth
              label="E-mail"
              variant="standard"
              {...register("email", {
                required: "Required field",
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <Visibility sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="password"
              type="password"
              fullWidth
              label="Contraseña"
              variant="standard"
              {...register("password", {
                required: "Required field",
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
            />
          </Box>

          <Button
            type="submit"
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
          >
            Ingresar
          </Button>
        </form>
        {loginStatus && (
          <AlertMessage
            type={loginStatus}
            message={
              loginStatus === "success"
                ? `Bienvenid@ al sitio!`
                : `Por favor verifique sus credenciales`
            }
          />
        )}
      </Container>
    </div>
  );
};

export default Login;
