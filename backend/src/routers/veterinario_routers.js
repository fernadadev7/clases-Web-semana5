//el objeto router permite manejar las rutas 

import{Router} from 'express'
import { registro } from '../controllers/veterinario_controllers.js';
const router = Router()

router.post('/registro', registro)

export default router;