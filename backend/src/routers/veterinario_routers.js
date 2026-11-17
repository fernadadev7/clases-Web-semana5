//el objeto router permite manejar las rutas

import{Router} from 'express'
import { registro, listar, obtenerPorId, eliminar } from '../controllers/veterinario_controllers.js';
const router = Router()

// CAMBIO: antes solo existía esta ruta (POST /registro), por eso no había forma de consultar datos.
router.post('/registro', registro)

// NUEVO: lista todos los registros -> GET /api/
router.get('/', listar)

// NUEVO: obtiene un registro por id -> GET /api/:id
router.get('/:id', obtenerPorId)

// NUEVO: elimina un registro por id -> DELETE /api/:id
router.delete('/:id', eliminar)

export default router;
