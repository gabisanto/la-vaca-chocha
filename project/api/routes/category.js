const express = require("express");
const { Products } = require("../models");
const router = express.Router();
const Categories = require("../models/Categories")


//RUTA QUE DEVUELVA LOS PRODUCTOS DE DETERMINADA CATEGORIA

router.get('/:name', function(req, res, next) {
    Categories.findOne({
        where: {
            name : req.params.name 
        },
        include : {model : Products} 
    })
    .then((products)=>res.send(products))
    .catch(next)
}); 



//RUTA QUE DEVUELVE TODAS LAS CATEGORIAS

router.get('/', function(req, res, next) {
    Categories.findAll()
    .then((products)=>res.send(products))
    .catch(next)
}); 



//RUTA QUE DEVUELVA LOS PRODUCTOS CUYO NOMBRE, COINCIDA CON LA BUSQUEDA DEL USUARIO A TRAVES DE INPUT

router.get('/name',function(req,res,next){

});




module.exports = router;

