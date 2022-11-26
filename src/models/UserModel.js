const mongoose =require("mongoose")

const userSchema = new mongoose.Schema({
    nombre:  {type: String, required: true},
    usuario:{type:String,require:true,unique:true},
    contraseña:{type:String,require:true},
    productos:[{
      type:mongoose.Schema.ObjectId,
      ref:'producto',
      
    }],
    reseñas:[{
      type:mongoose.Schema.ObjectId,
      ref:'reseña',
     
    }],
    
    carrito:[{
        type:mongoose.Schema.ObjectId,
        ref:'producto',
        
      }],
    },{
      versionKey:false
    });

module.exports=mongoose.model('user',userSchema)