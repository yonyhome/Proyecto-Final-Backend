
const express = require('express')
const router = express.Router()
const UserModel = require("../models/UserModel")
const mongoose =require("mongoose")


router.post("/user", (req, res) => {
    const user = UserModel(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});


router.get("/users", (req, res) => {
    UserModel
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

//login
router.get("/user/login", (req,res)=>{
    const {username, password} = req.body;
    console.log(username)
    UserModel.findOne({usuario: username, contraseña: password})
        .then((data) => res.json(data._id))
        .catch((err) => res.json({ message: 'Credenciales Incorrectas' }));
});

router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, usuario, contraseña, productos, reseñas, carrito } = req.body;
    UserModel
        .updateOne({_id: id},{$set: {nombre, usuario, contraseña,productos, reseñas, carrito}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

router.put("/user/comprar/:id", async(req, res) => {
    const { id } = req.params;
    const carrito=await UserModel.findById(id,{carrito:1,productos:1,_id:0})
    console.log([carrito.productos, carrito.carrito].flat())
    UserModel
        .updateOne({_id: id},{$set: {productos:carrito.productos.concat(carrito.carrito),carrito:[]}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));

 
});

router.put("/user/quitar_producto_carrito", async(req, res) => {
    const { iduser,idproductocarrito} = req.body;
    UserModel
        .updateOne({_id: iduser},{$pull: {carrito:mongoose.Type.ObjectID(idproductocarrito)}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));

 
});
router.delete('/user/:id', async (req,res) => {
    const id= req.params.id;
    
    // CREACION DE DOCUMENTO SEGUN MODELO
    const {idtoken} = req.body;
    UserModel.findById(idtoken)
        .then(async (data) => {await UserModel.findByIdAndRemove(id).then((da)=>res.json(da)).catch((err)=>res.json({message:'Usuario no existe'}))})
        .catch((err) => res.json({ message: 'Credenciales Incorrectas' }));

}) 

module.exports = router