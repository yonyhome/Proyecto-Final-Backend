
const express = require('express')
const router = express.Router()
const UserModel = require("../models/UserModel")



router.post("/user", (req, res) => {
    const user = UserModel(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
//login
router.get("/user/login", (req,res)=>{
    const {usuario, contraseña} = req.body;
    console.log(usuario)
    UserModel
        .find({usuario})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
router.get("/users", (req, res) => {
    UserModel
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, usuario, contraseña, productos, reseñas, carrito } = req.body;
    UserModel
        .updateOne({_id: id},{$set: {nombre, usuario, contraseña,productos, reseñas, carrito}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
router.delete('/user/:id', async (req,res) => {
    const id= req.params.id;
    // CREACION DE DOCUMENTO SEGUN MODELO
    try{
    const deleteuser= await UserModel.findByIdAndRemove(id)
    res.json(deleteuser);
    }catch(e){
     res.json(e.message); 
    }
})

module.exports = router