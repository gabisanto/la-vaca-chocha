import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import "../index.css";
import HeartFav from "../commons/HeartFav";


const ProductsCard = () => {
   return (
    <div>
    <Card sx={{ display: 'flex' }}>  
    <CardMedia
        component="img"
        sx={{ width: 350 }}
        image="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/434/490/products/zucc02_1-e90635fa7d1a781d0a16027132680536-1024-10241-60160a9a642d1bb10516085256452282-640-0.jpg"
        alt="aceita La toscana"
      />  
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
        Aceite de Oliva Extra Virgen Clásico x 500ml <HeartFav/>
        </Typography>
        <Typography variant="h5" component="div">
         Zuccardi
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
      <Button sx={{ backgroundColor:"#03A696"}}variant="contained">Agregar al carrito</Button>
      </CardActions>
    </Card>
 
    </Card>
    </div>
  );
};

export default ProductsCard;
