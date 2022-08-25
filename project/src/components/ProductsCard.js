import React, { useEffect , useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Container } from "@mui/material";
import styles from "../styles/userpages.module.css";
import "../index.css";
import HeartFav from "../commons/HeartFav";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Volver from "../commons/Volver";
import { useSelector, useDispatch } from "react-redux";



const ProductsCard = () => {
  const {id}= useParams()
  const [products, setProducts] = useState([]);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
   
  // me trigo a producto por id
  useEffect(() => {
    axios
    .get(`http://localhost:3001/api/products/${id}`)
    .then((res) => res.data)
    .then((data) => {
      setProducts(data);
    });
  }, []);


  const addCart = (id) => {
   console.log(id);
  };

  
   return (
    <div   style={{backgroundColor: "#f1e9da" }}
    className={styles.backImg}>

<Container
          
        
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
          }}
        >    
        <Card sx={{ display: 'flex' ,width: 550}} 
              sm={{display: 'flex', width: 450 }} 
              md={{display: 'flex', width: 250 }}>  
        
        <CardMedia
        sx={{ width: 250 }}
        sm={{ width: 250 }} 
        md={{ width: 150 }}
            component="img"
            image="https://st3.depositphotos.com/1000419/12865/v/600/depositphotos_128654054-stock-illustration-funny-colorful-cows-dancing-sketch.jpg"
            alt="aceita La toscana"
          />  
         
          
        <Card sx={{ width: 300 }}
              sm={{ width: 200 }} 
              md={{ width: 100 }}>
          <CardContent>
            
            <Typography variant="h5" component="div">
            {products.name}<HeartFav/>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
               {products.price}
            </Typography>
            <Typography variant="body2">
            {products.description}
              <br />         
            </Typography>
            <br/>
            <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
            Cantidad disponible: {products.stock}
            </Typography>
          </CardContent>
          <CardActions>
          <Link to="/product">
          <Volver/>
          </Link>
          <Button 
                variant="contained"
                onClick={() =>
                  dispatch({
                    type: "ADD",
                    payload: { ...products, quantity: 1 },
                  })
                }
                type="submit"
                size="medium"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#03A696",
                  "&:hover": {
                    backgroundColor: "#04BF9D",
                    color: "#757575",
                  },
                }}
              >
                Agregar al carrito
              </Button>
              
              
          </CardActions>
        </Card>
        </Card> 
        </Container>
    </div>
  );
};

export default ProductsCard;
