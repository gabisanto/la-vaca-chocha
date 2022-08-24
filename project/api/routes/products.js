const express = require("express");
const router = express.Router();
const Products = require("../models/Products.js")


router.get('/', function(req, res, next) {
    Products.findAll()
    .then((products)=>res.send(products))
    .catch(next)
})   

router.get('/:id', function(req, res, next) {
    Products.findOne({
        where : {
            id :req.params.id
        }
    })
    .then((product)=>res.send(product))
    
})  


router.post('/', function(req,res,next) {
    Products.create (
        req.body
    )
    .then((product)=>res.send(product))


router.delete('/:id',function(req,res,next){
    Products.destroy({
        where: {
            id : req.params.id
        }
    }).then((user)=> res.sendStatus(202))
})

router.put('/:id',function(req,res,next){
    Products.update(req.body, {where : {id : req.params.id}, returning : true })
    .then(([row,update])=>{
        const product = update[0];
        res.send(product)
    })
})
   

})

module.exports = router;
