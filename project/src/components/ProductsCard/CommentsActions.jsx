import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import useMatches from "../../hooks/useMatches";
import CommentBox from "./CommentBox";

const CommentsActions = ({ product, user }) => {
  const [productComments, setProductComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${product.id}/comments`)
      .then((res) => setProductComments(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* verificar que el usuario lo compró y que el usuario no dejó comments */

  return (
    <div style={{ width: "100%", marginTop: 5 }}>
      <Card>
        <p style={{ padding: 10, fontWeight: "bold" }}>
          Comentarios del producto
        </p>
        {user.email && <CommentBox product={product} />}
        {productComments.length > 0 ? (
          productComments.map((comment) => (
            <Card
              key={comment.id}
              sx={{
                display: "flex",
                width: "100%",
                height: "fit-conten",
                flexDirection: "column",
                padding: 5,
                borderRadius: 0,
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: 4 }}>
                Usuario #{comment.userId} dijo:{" "}
              </p>
              <p> {comment.comment}</p>
            </Card>
          ))
        ) : (
          <Card
            sx={{
              display: "flex",
              width: "100%",
              height: "fit-conten",
              flexDirection: "column",
              padding: 5,
              borderRadius: 0,
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: 4 }}>
              El producto aún no tiene comentarios.
            </p>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default CommentsActions;
