const express = require("express");
const { Products } = require("../models");
const { update } = require("../models/Categories");
const router = express.Router();
const Categories = require("../models/Categories")


//RUTA QUE DEVUELVA LOS PRODUCTOS DE DETERMINADA CATEGORIA

router.get('/:name', function(req, res, next) {
    Categories.findOne({
        where: {
            name : req.params.name 
        },
        include : {model : Products , as: "name"} 
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
// INCONLUSA
// router.get('/name',function(req,res,next){
// });


//RUTA PARA CREAR CAREGORIAS

router.post('/', function(req,res,next){
    Categories.create(req.body)
    .then((category)=>res.send(category))
})

//RUTA PARA ELIMINAR CATEGORIAS

router.delete('/:id',function(req,res,next){
    Categories.destroy({
        where : {
            id : req.params.id
        }
    })
    .then((category)=>res.sendStatus(202))
})

//RUTA PARA EDITAR CATEGORIAS

router.put('/:id',function(req,res,next){
    Categories.update(req.body, {where:{id : req.params.id},returning:true})
    .then(([row,update])=>{
        const category = update[0];
        res.send(category)
    })
})


module.exports = router;

