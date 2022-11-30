const express=require('express')
const mongoose=require('mongoose')
const userRoutes = require("./routes/UserRoute")
const productRoutes = require("./routes/ProductRoute")
const CatProRoutes = require("./routes/CategoriaProductoRoute")
const resRoutes= require("./routes/Resena")

const URLMONGO="mongodb+srv://admin:wSDGhlrxWDglTMpC@backend.voagjxh.mongodb.net/?retryWrites=true&w=majority"
const port=9001
const app = express()

//Middleware 
app.use(express.json())

// routes 
app.use('/api',userRoutes)
app.use('/api',productRoutes)
app.use('/api',CatProRoutes)
app.use('/api',resRoutes)




//Conexión a MongoDB  
mongoose.connect(URLMONGO)
.then(async ()=>console.log('Connected to MongoDB Atlas'))
.catch(async (error)=>console.error(error))



app.listen(port,()=>console.log(`SERVER LISTENING ON PORT`,port))
 
export function Getapp(){
    const app = express()

//Middleware 
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
// routes 
app.use('/api',userRoutes)
app.use('/api',productRoutes)
app.use('/api',CatProRoutes)
app.use('/api',resRoutes)
app.use(async (req, res) => {
    res.status(404).json({message: "Not found."})
});
    return app
 }