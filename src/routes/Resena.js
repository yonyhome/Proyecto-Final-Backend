const express = require('express')
const router = express.Router()
const ReseñasModel = require("../models/ReseñasModel");
const UserModel = require("../models/UserModel");
const ProductoModel=require("../models/ProductModel");
const mongoose = require("mongoose");
//Get reseña por usuario
router.get('/resena/user/:id_usuario', async (req,res) => {
  const id= req.params.id_usuario;
  let todasresenas=[]
  // CREACION DE DOCUMENTO SEGUN MODELO
try{
  const resenas= await UserModel.findById(id,{reseñas:1,_id:0})
  const allresenas=resenas.reseñas
  for (let index = 0; index < allresenas.length; index++) {
      const id=allresenas[index]
      const resena= await (await ResenasModel.findById(id,{descripcion:1,puntuacion:1}));
       if(resena!=null){
      todasresenas[index] = resena
       }
       }
       todasresenas= todasresenas.flat();
       res.json(todasresenas)
}catch(e){
  res.json(e.message)
} 
})
//Get reseña por producto
router.get('/resena/product/:id_producto', async (req,res) => {
  const id= req.params.id_producto;
  let todasresenas=[]
  // CREACION DE DOCUMENTO SEGUN MODELO
try{
  const resenas= await ProductoModel.findById(id,{reseñas:1,_id:0});
  const allresenas=resenas.reseñas
  for (let index = 0; index < allresenas.length; index++) {
      const id=allresenas[index]
      const resena= await (await ResenasModel.findById(id,{descripcion:1,puntuacion:1}));
       if(resena!=null){
      todasresenas[index] = resena
       }
       }
   todasresenas= todasresenas.flat();
 res.json(todasresenas)
}catch(e){
  res.json(e.message)
} 
})
// Get reseña por puntuacion
router.get('/resena/score/:puntuacion', async (req,res) => {
  // CREACION DE DOCUMENTO SEGUN MODELO
  const score=parseInt(req.params.puntuacion,10)

try{
  const resenas= await ResenasModel.find({puntuacion:score});
 res.json(resenas)
}catch(e){
  res.json(e.message)
} 
})
//get todas las reseñas
router.get('/resena', async (req,res) => {
  // CREACION DE DOCUMENTO SEGUN MODELO
try{
  const resenas= await ResenasModel.find({});
 res.json(resenas)
}catch(e){
  res.json(e.message)
} 
})
// Crear una reseña
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
//Delete reseña
router.delete('/deleteresena/:id', async (req,res) => {
  const id= req.params.id;
  // CREACION DE DOCUMENTO SEGUN MODELO
  try{
  const deleteresena= await ResenasModel.findByIdAndRemove(id,{idproducto:1,idusuario:1,_id:0})
  const idproducto=deleteresena.idproducto
  const idusuario=deleteresena.idusuario
  const usuario= await UserModel.findByIdAndUpdate(idusuario,{
      $pull:{
          reseñas:mongoose.Types.ObjectId(id)
      }
  });
  const producto= await ProductoModel.findByIdAndUpdate(idproducto,{
      $pull:{
          reseñas:mongoose.Types.ObjectId(id)
      }
  });
  res.json({
      Mensaje:'Se eliminó correctamente la resena'
  });
  }catch(e){
   res.json(e.message); 
  }
})
module.exports = router;