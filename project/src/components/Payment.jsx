import React from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../commons/AlertMessage";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useMatches from "../hooks/useMatches";
import { TextField, Container, Box, Button } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import {
  Key,
  AccountCircle,
  LocalShipping,
  CreditCard,
} from "@mui/icons-material";
import axios from "axios";
 

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const addition = (acc, currentvalue) => {
    return acc + currentvalue.price * currentvalue.quantity;
  };
  const invoiceSubtotal = cart.reduce(addition, 0);
  console.log(invoiceSubtotal);
  /* comienzo useNavigate */
  const navigate = useNavigate();

  /* media queries */
  const matches = useMatches();

  /* registro react hook form; envío de información a la DB */
  const [paymentStatus, setPaymentStatus] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [registerStatus, setRegisterStatus] = useState("");
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const finalData = { ...data, cart, userId: user.id, email: user.email, name: user.name };
    axios.post("http://localhost:3001/api/checkout", finalData)
    /* manejo errores */
    .then(({ data }) => {
        if (!data.error) {
          setRegisterStatus("success");
          setTimeout(() => dispatch({ type: "RESET", payload: cart }), 3000);;
          setTimeout(() => navigate("/"), 3000);
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
        backgroundColor: "#f1e9da",
        padding: 10,
      }}
      className="backPay"
    >
      <Container
        maxWidth={matches ? "xs" : "m"}
        sx={{
          p: 1,
          mb: 1,
          mt: 1,
          backgroundColor: "#e0e0e0",
          borderRadius: 1,
          color: "action.active",
          fontWeight: "bold",
        }}
      >
        <p style={{ textAlign: "center" }}>Proceso de pago</p>
      </Container>
      {user.email ? (
        <Container
          maxWidth={matches ? "xs" : "m"}
          sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <CreditCard sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                name="cardnumber"
                fullWidth
                label="Número de la tarjeta"
                variant="standard"
                {...register("cardnumber", {
                  required: "El número de tarjeta es obligatorio",
                  pattern: {
                    value: /^[0-9]{16}$/,
                    message: "Ingrese un número válido",
                  },
                })}
                error={!!errors?.cardnumber}
                helperText={
                  errors?.cardnumber ? errors.cardnumber.message : null
                }
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
              <Key sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                name="securitynumber"
                fullWidth
                label="Número de seguridad"
                variant="standard"
                {...register("securitynumber", {
                  required: "El número de seguridad es obligatorio",
                  pattern: {
                    value: /^[0-9]{3}$/,
                    message: "Ingrese un número válido",
                  },
                })}
                error={!!errors?.securitynumber}
                helperText={
                  errors?.securitynumber ? errors.securitynumber.message : null
                }
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                name="cardholder"
                fullWidth
                label="Nombre como figura en la tarjeta"
                variant="standard"
                {...register("cardholder", {
                  required: "El nombre es obligatorio",
                })}
                error={!!errors?.cardholder}
                helperText={
                  errors?.cardholder ? errors.cardholder.message : null
                }
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
              <LocalShipping sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                name="address"
                fullWidth
                label="Domicilio de entrega"
                variant="standard"
                {...register("address", {
                  required: "El domicilio de entrega es obligatorio",
                })}
                error={!!errors?.address}
                helperText={errors?.address ? errors.address.message : null}
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
              Confirmar pago
            </Button>
          </form>
          {paymentStatus && (
            <AlertMessage
              type={paymentStatus}
              message={
                paymentStatus === "success"
                  ? `Pago registrado`
                  : `Por favor verificar datos ingresados`
              }
            />
          )}
        </Container>
      ) : (
        <Container
          maxWidth={matches ? "xs" : "m"}
          sx={{
            p: 1,
            mb: 1,
            mt: 1,
            backgroundColor: "#e0e0e0",
            borderRadius: 1,
            color: "action.active",
            fontWeight: "bold",
          }}
        >
          <p style={{ textAlign: "center" }}>
            Por favor ingrese en el sitio para seguir el proceso
          </p>
          <CardActions>
            <Link to="/login">
              <Button size="small">Ir al login</Button>
            </Link>
          </CardActions>
        </Container>
      )}
    </div>
  );
};

export default Payment;
