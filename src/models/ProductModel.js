const mongoose =require("mongoose")
const productSchema = new mongoose.Schema({
    
    nombre:{type:String,require:true},
    categoría:{
      type:mongoose.Schema.ObjectId,
      ref:'categoriaproducto',
    },
    fechacompra:{type: Date, default: Date.now },
    precio:{type:Number,require:true},
    reseñas:[{
      type:mongoose.Schema.ObjectId,
      ref:'reseña',
     
    }],
    },{
      versionKey:false
    });

module.exports=mongoose.model('producto',productSchema)