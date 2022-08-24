import axios from "axios";
import { useState } from "react";
import styles from "../styles/userpages.module.css";
import { Typography, Container, Button,Grid,Card, CardContent,CardActions ,Box , TextField} from "@mui/material";
import Cart from "../commons/Cart";



const Search = () => {
   /*  const { user } = useContext(AuthContext); */
   const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
   
    const searchOnChange = (e) => {
        setSearch(e.target.value);
      };

   
    const searchProduct = (e) => {
        e.preventDefault();
        axios
          .get(`api/prduct/search/${search}`)
          .then((res) => res.data)
          .then((data) => {
            setResults(data.results);
          });
      };
    
  const addCart = ()=>{

    console.log("add");
  }
    

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
     
      <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
           
            <TextField
              id="input-with-sx"
              name="search"
              fullWidth
              label="Search"
              variant="standard"
              onChange={searchOnChange} 
            />
             <Button 
            variant="contained"
            onClick={searchProduct}
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
          > Search </Button>
          </Box>
    </Container>
    <Container  sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
     <Grid container my={4}>
        {results?.map((producto)=>{

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

export default Search;
