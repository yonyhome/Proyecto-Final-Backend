const mongoose =require("mongoose")
const reseñaSchema = new mongoose.Schema({
    
    idproducto:{
        type:mongoose.Schema.ObjectId,
        ref:'producto',
       
      },
    idusuario:{
        type:mongoose.Schema.ObjectId,
        ref:'usuario',
       
      },
    puntuacion:{type:Number,require:true},
    descripcion:{type:String,require:true},
  
    },{
      versionKey:false
    });

module.exports=mongoose.model('reseña',reseñaSchema)