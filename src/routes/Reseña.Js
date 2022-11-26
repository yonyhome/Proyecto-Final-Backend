const express = require('express')
const router = express.Router()
const ReseñasModel = require("../models/ReseñasModel");
const UserModel = require("../models/UserModel");
const ProductoModel=require("../models/ProductModel");
const mongoose = require("mongoose");
router.get('/reseña/:id_usuario', async (req,res) => {
    const id= req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
  try{
    const reseñas= await UserModel.findById(id,{reseñas:1});
   res.json(reseñas)
  }catch(e){
    res.json(e.message)
  } 
})
router.get('/reseña/:id_producto', async (req,res) => {
    const id= req.params.id_producto;
    // CREACION DE DOCUMENTO SEGUN MODELO
  try{
    const reseñas= await ProductoModel.findById(id,{reseñas:1});
   res.json(reseñas)
  }catch(e){
    res.json(e.message)
  } 
})
router.post('/reseña/createreseña/:id_producto/:id_usuario', async (req,res) => {
    const idproducto= req.params.id_producto;
    const idusuario=req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
    try{
        const {puntuacion,descripcion} = req.body;
        const newReseña = new ReseñasModel({
          idproducto,
          idusuario,
          puntuacion,
          descripcion
        });
    const reseña= await newReseña.save()
    res.json(reseña);
    }catch(e){
     res.json(e.message); 
    }
})
router.get('/seguidos/:id_usuario', async (req,res) => {
    const id= req.params.id_usuario;
    // CREACION DE DOCUMENTO SEGUN MODELO
   const seguidos= await UserModel.findById(id,{seguidos:1});
   res.json(seguidos)
    
})
router.put('/createSeguidor/:id_usuario/:id_seguidor', async (req,res) => {
    const id_usuario= req.params.id_usuario;
    const id_seguidor=req.params.id_seguidor;
    // CREACION DE DOCUMENTO SEGUN MODELO
   if(id_usuario!=id_seguidor){
     try{
        const usuarioseguidor= await UserModel.findById(id_seguidor);
        const usuario= await UserModel.findByIdAndUpdate(id_usuario,{
            $push:{
                'seguidores':usuarioseguidor
            }
        });
        const seguidor= await UserModel.findByIdAndUpdate(id_seguidor,{
            $push:{
       'seguidos':usuario
            }
        });
       
    res.json({
        Mensaje:'Se agregó correctamente el vinculo'
    });

    }catch(e){
     res.json(e.message); 
    }
}else{
    console.log('El id es igual ')
}
    
})
router.put('/deleteVinculo/:id_usuario/:id_seguidor', async (req,res) => {
    const id_usuario= req.params.id_usuario;
    const id_seguidor=req.params.id_seguidor;
    // CREACION DE DOCUMENTO SEGUN MODELO
    if(id_usuario!=id_seguidor){
        try{
           const usuarioseguidor= await UserModel.findById(id_seguidor);
           const usuario= await UserModel.findByIdAndUpdate(id_usuario,{
               $pull:{
                   seguidores:mongoose.Types.ObjectId(id_seguidor)
               }
           });
           const seguidor= await UserModel.findByIdAndUpdate(id_seguidor,{
               $pull:{
          seguidos:mongoose.Types.ObjectId(id_usuario)
        }
         }
           );
          
           res.json({
            Mensaje:'Se eliminó correctamente el vinculo'
        });
       
       }catch(e){
        res.json(e.message); 
       }
   }else{
       console.log('El id es igual ')
   }
})
module.exports = router;