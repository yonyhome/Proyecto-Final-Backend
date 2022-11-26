const mongoose =require("mongoose")
const reseñaSchema = new mongoose.Schema({
    
    idproducto:{
        type:mongoose.Schema.ObjectId,
        ref:'producto',
       
      },
    idproducto:{
        type:mongoose.Schema.ObjectId,
        ref:'usuario',
       
      },
    puntuacion:{type:Number,require:true},
    desc:{type:String,require:true},
  
    },{
      versionKey:false
    });

module.exports=mongoose.model('reseña',reseñaSchema)