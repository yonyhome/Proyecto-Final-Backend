const mongoose =require("mongoose")
const resenaSchema = new mongoose.Schema({
    
    idproducto:{
        type:mongoose.Schema.ObjectId,
        immutable:true
      },
    idusuario:{
        type:mongoose.Schema.ObjectId,
        immutable:true
      },
    puntuacion:{type:Number,require:true},
    descripcion:{type:String,require:true},
  
    },{
      versionKey:false
    });

module.exports=mongoose.model('reseña',resenaSchema)