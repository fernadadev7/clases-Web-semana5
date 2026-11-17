// Requerir módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerVeterinarios from './routers/veterinario_routers.js';



// Inicializaciones
const app = express()
dotenv.config()


// Configuraciones 



// Middlewares 
app.use(express.json())
app.use(cors())



// Variables globales
app.set('port',process.env.PORT || 3000)


//cualquier ruta que se vaya usar se pone en esta 
// Rutas 
app.get('/',(req,res)=> res.send("Server on"))
app.use("/api",routerVeterinarios)



// Exportar la instancia de express por medio de app
export default  app