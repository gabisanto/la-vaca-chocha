import * as React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addComment } from "../../store/user";
import { Button } from "@mui/material";
import AlertMessage from "../../commons/AlertMessage";

export default function MultilineTextFields({ product }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentStatus, setCommentStatus] = useState("");
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  const onSubmit = (data) => {
    let comment = { comment: data.comment, userId: user.id, product: product };
    dispatch(addComment(comment))
      .then(({ payload }) => {
        if (payload) {
          setCommentStatus("success");
          setTimeout(() => {
            setCommentStatus("");
            navigate("/profile");
          }, 3000);
        } else {
          setCommentStatus("error");
          setTimeout(() => setCommentStatus(""), 3000);
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/orders/${user.id}`)
      .then((res) => res.data)
      .then((data) => {
        setOrders(data);
      });
  }, []);

  let idsOrders = [];
  let prods = orders.map(({ products }) =>
    products.map((p) => idsOrders.push(p.id))
  );

  let productsCommented = user.comments.map((comment) => comment.idProduct);

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {idsOrders.includes(product.id) &&
      !productsCommented.includes(product.id) ? (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "80%" }}>
          <div>
            <TextField
              sx={{ width: "100%", borderRadius: 0 }}
              id="outlined-textarea"
              label="Tu comentario"
              placeholder="¡Podes dejar tu comentario!"
              multiline
              {...register("comment", {
                required: "Required field",
              })}
              error={!!errors?.comment}
              helperText={errors?.comment ? errors.comment.message : null}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              fontWeight: "bold",
              backgroundColor: "#03A696",
              "&:hover": {
                backgroundColor: "#04BF9D",
                color: "#757575",
              },
            }}
          >
            Agregar comentario
          </Button>
        </form>
      ) : null}
      {commentStatus && (
        <AlertMessage
          type={commentStatus}
          message={
            commentStatus === "success"
              ? `Gracias por tu comentario`
              : `Hubo un error`
          }
        />
      )}
    </Box>
  );
}
