import axios from "axios";
import { useState ,useEffect } from "react";
import styles from "../styles/userpages.module.css";
import { Typography, Container, Button,Grid,Card, CardContent,CardActions } from "@mui/material";
import Cart from "../commons/Cart";


const ShowProducts = () => {
   /*  const { user } = useContext(AuthContext); */
    const [products, setProducts] = useState([]);
   
    // me trigo a products
    useEffect(() => {
      axios
      .get("/api/products")
      .then((res) => res.data)
      .then((data) => {
        setProducts(data.results);
      });
    }, []);
 
    const addCart = (id) => {
        console.log(id);
      axios
      .post(`/api/cart`, {
          id
        })
     
    };
  
    

   return (
    <div
    style={{
      backgroundColor: "#f1e9da",
    }}
    className={styles.backImg}
  >
    <Container
           sx={{
        p: 1,
        mb: 1,
        backgroundColor: "#e0e0e0",
        borderRadius: 1,
        color: "action.active",
        fontWeight: "bold",
      }}
    >
      <p style={{ textAlign: "center" }}>Productos</p>
    </Container>
    <Container  sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
     <Grid container my={4}>
        {products?.map((producto)=>{

        <Grid item xs={4} p={2}>
        <Card >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {producto.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {producto.description}
        </Typography>
        <br/>
        <Typography variant="h6" color="text.secondary">
        {producto.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{addCart(producto.id)}}><Cart/></Button>      
      </CardActions>
    </Card>                  
        </Grid>

        })}     
     </Grid>
    </Container>
  </div>
  );
};

export default ShowProducts;
