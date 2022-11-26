const mongoose =require("mongoose")
const categoriaSchema = new mongoose.Schema({
    
    nombre:{type:String,require:true,unique:true},
    tipo:{type:Number,require:true},
  
    },{
      versionKey:false
    });

module.exports=mongoose.model('categoriaproducto',categoriaSchema)
