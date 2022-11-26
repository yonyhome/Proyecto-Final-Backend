const express=require('express')
const mongoose=require('mongoose')
 

const URLMONGO="mongodb+srv://admin:wSDGhlrxWDglTMpC@backend.voagjxh.mongodb.net/?retryWrites=true&w=majority"
const port=9001
const  app = express()
const userRoutes = require("./routes/UserRoute")
const productRoutes = require("./routes/ProductRoute")
const CatProRoutes = require("./routes/CategoriaProductoRoute")

//Middleware 
app.use(express.json())
app.use('/api',userRoutes)
app.use('/api',productRoutes)
app.use('/api',CatProRoutes)

// routes 
app.get('/',(req,res) =>{
    res.send('API HOME')
})




//Conexión a MongoDB  
mongoose.connect(URLMONGO)
.then(()=>console.log('Connected to MongoDB Atlas'))
.catch((error)=>console.error(error))



app.listen(port,()=>console.log(`SERVER LISTENING ON PORT`,port))
