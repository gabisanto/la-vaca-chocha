import React, { useEffect , useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import styles from "../styles/userpages.module.css";
import "../index.css";
import HeartFav from "../commons/HeartFav";
import axios from "axios";



const ProductsCard = () => {

  const [products, setProducts] = useState([]);
   
  // me trigo a producto por id
  useEffect(() => {
    axios
    .get("/api/products/:id")
    .then((res) => res.data)
    .then((data) => {
      setProducts(data.results);
    });
  }, []);


  const addCart = (id) => {
   console.log(id);
  };

  
   return (
    <div   style={{
      backgroundColor: "#f1e9da",
    }}
    className={styles.backImg}>
    <Card sx={{ display: 'flex' }}>  
    <CardMedia
        component="img"
        sx={{ width: 350 }}
        image="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/434/490/products/zucc02_1-e90635fa7d1a781d0a16027132680536-1024-10241-60160a9a642d1bb10516085256452282-640-0.jpg"
        alt="aceita La toscana"
      />  
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        
        <Typography variant="h5" component="div">
        {products.name} Zuccardi <HeartFav/>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
           $1.446,11
        </Typography>
        <Typography variant="body2">
        Esta selección especial, da un aroma frutado verde intenso con notas de hierba recién cortada. Aceite de gran cuerpo, con un suave amargor y picor indicativos del mayor porcentaje de antioxidantes (Polifenoles), característicos de la aceituna en envero de más alto contenido en Ácido Oleico.
        Aceite de Oliva para experimentar con los platos de siempre.
          <br />         
        </Typography>
        <br/>
        <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
        Cantidad disponible: 10
        </Typography>
      </CardContent>
      <CardActions>
      <Button 
            variant="contained"
            onClick={()=>{addCart()}}
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
    </div>
  );
};

export default ProductsCard;
