const express = require('express');
const ProductModel = require('../models/ProductModel');
const router = express.Router()
const ProducModel = require("../models/ProductModel")
const UserModel = require("../models/UserModel")


router.post("/product", (req, res) => {
    const Produc = ProducModel(req.body);
    Produc
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
//Get all products
router.get("/Products", (req, res) => {
    ProducModel
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
//Get one product
router.get("/product/:id", (req, res) => {
    const { id } = req.params;
    ProductModel
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
//Get Products by user id
router.get("/user/:id/products", (req, res) => {
    const { id } = req.params;
    UserModel
        .findById(id)
        .then((data) => res.json(data.productos))
        .catch((err) => res.json({ message: err }));
});
//Get product by name
router.get("/product/name/:name", (req, res) => {
    const { name } = req.params;
    ProductModel
        .find({nombre:name})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

//Get product by categoria
router.get("/product/category/:category", (req, res) => {
    const { category } = req.params;
    ProductModel
        .find({categoria:category})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
//update a product
router.put("/Produc/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, precio, reseña} = req.body;
    ProducModel
        .updateOne({_id: id},{$set: { nombre, categoria, precio, reseña}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

//Delete a product
router.delete('/Produc/:id', async (req,res) => {
    const id= req.params.id;
    try{
    const deleteProduc= await ProducModel.findByIdAndRemove(id)
    res.json(deleteProduc);
    }catch(e){
     res.json(e.message); 
    }
})

module.exports = router