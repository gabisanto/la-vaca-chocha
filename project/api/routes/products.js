const express = require("express");
const router = express.Router();
const Products = require("../models/Products.js")

//RUTA QUE DEVUELVA TODOS LOS PRODUCTOS

router.get('/', function(req, res, next) {
    Products.findAll()
    .then((products)=>res.send(products))
    .catch(next)
}) 

//RUTA QUE DEVUELVA UN PRODUCTO ESPECIFICO

router.get('/:id', function(req, res, next) {
    Products.findOne({
        where : {
            id :req.params.id
        }
    })
    .then((product)=>res.send(product))
})  

//RUTA PARA AGREGAR UN PRODUCTO

router.post('/', function(req,res,next) {
    Products.create (
        req.body
    )
    .then((product)=>res.send(product))

// RUTA PARA ELIMINAR UN PRODUCTO    

router.delete('/:id',function(req,res,next){
    Products.destroy({
        where: {
            id : req.params.id
        }
    }).then((user)=> res.sendStatus(202))
})

//RUTA PARA MODIFICAR UN PRODUCTO

router.put('/:id',function(req,res,next){
    Products.update(req.body, {where : {id : req.params.id}, returning : true })
    .then(([row,update])=>{
        const product = update[0];
        res.send(product)
    })
})
   

})


module.exports = router;
