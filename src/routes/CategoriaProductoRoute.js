
const express = require('express')
const router = express.Router()
const CatProModel = require("../models/CategoriaProductoModel")



router.post("/categoria", (req, res) => {
    const usCatProMod = CatProModel(req.body);
    usCatProMod
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
router.get("/categorias", (req, res) => {
    CatProModel
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});


router.get("/categoria/:id", (req, res) => {
    const { id }=req.params
    CatProModel.findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
router.get("/nombre-categoria/:nombre", (req, res) => {
    const { nombre }=req.params
    CatProModel.find({nombre})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});



router.put("/categoria/:id", (req, res) => {
    const { id } = req.params;
    const { nombre,tipo } = req.body;
    CatProModel
        .updateOne({_id: id},{$set: {nombre, tipo}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
router.delete('/categoria/:id', async (req,res) => {
    const id= req.params.id;
    // CREACION DE DOCUMENTO SEGUN MODELO
    try{
    const deletecatpro= await CatProModel.findByIdAndRemove(id)
    res.json(deletecatpro);
    }catch(e){
     res.json(e.message); 
    }
})

module.exports = router
