const express = require('express')
const router = express.Router()
const ResenasModel = require("../models/ReseñasModel");
const UserModel = require("../models/UserModel");
const ProductoModel=require("../models/ProductModel");
const mongoose = require("mongoose");
const ProductModel = require('../models/ProductModel');
router.get('/resena/:id_usuario', async (req,res) => {
    const id= req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
  try{
    const resenas= await UserModel.findById(id,{resenas:1});
   res.json(resenas)
  }catch(e){
    res.json(e.message)
  } 
})
router.get('/resena/:id_producto', async (req,res) => {
    const id= req.params.id_producto;
    // CREACION DE DOCUMENTO SEGUN MODELO
  try{
    const resenas= await ProductoModel.findById(id,{resenas:1});
   res.json(resenas)
  }catch(e){
    res.json(e.message)
  } 
})
router.get('/resena', async (req,res) => {
    // CREACION DE DOCUMENTO SEGUN MODELO
  try{
    const resenas= await ResenasModel.find({puntuacion:{$eq:5}});
   res.json(resenas)
  }catch(e){
    res.json(e.message)
  } 
})
router.post('/resena/createresena/:id_producto/:id_usuario', async (req,res) => {
    const idproducto= req.params.id_producto;
    const idusuario=req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
    try{
        const {puntuacion,descripcion} = req.body;
        const newResena = new ResenasModel({
          idproducto,
          idusuario,
          puntuacion,
          descripcion
        });
    const resena= await newResena.save()
   // res.json(resena);
    const usuario= await UserModel.findByIdAndUpdate(idusuario,{
        $push:{
            'reseñas':resena
        }
        
    });
    const producto= await ProductModel.findByIdAndUpdate(idproducto,{
        $push:{
            'reseñas':resena
        }
        
    });
    res.json({
        Mensaje:'Se agrego correctamente la resena'
    });
    }catch(e){
     res.json(e.message); 
    }
})


module.exports = router;