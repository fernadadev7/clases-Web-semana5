import Veterinarios from "../models/Veterinarios.js"

//PARA CREA LA ESTRUCTURA DEL CONTROLADO5R
// CAMBIO IMPORTANTE: el formulario del frontend envía "correo" y "contrasenia",
// pero el modelo de la base de datos usa "email" y "password".
// Aquí traducimos esos nombres para que el registro funcione de verdad.
const registro = async (req, res )=>{

    try{
        //PASO1 voy a extreaer la informacion del body haciendo una desustruracion
        const { nombre, apellido, direccion, celular, correo, contrasenia } = req.body
        const email = correo
        const password = contrasenia

        //PASO2 validaciones
        if([nombre, apellido, direccion, celular, correo, contrasenia].some(valor => !valor || valor === ""))
            return res.status(400).json({msg:"lo sentimos debes llenar todos los campos"})

        //traer el modelo
        const verificarEmailBDD=await Veterinarios.findOne({email})
        if(verificarEmailBDD)
            return res.status(400).json({msg:"Lo sentimos, el email ya se envuentra segistrado"})
        //PASO3
        const nuevoVeterinario = new Veterinarios({ nombre, apellido, direccion, celular, email })

        // CAMBIO: antes faltaba "await" y se le pasaba un argumento de más al método.
        nuevoVeterinario.password = await nuevoVeterinario.encryptPassword(password);
        await nuevoVeterinario.save();

        //PASO4 mandar la respuesta
        res.status(201).json({msg:"Registro existoso"})

    }catch (error){
        console.log(error);
        // CAMBIO: antes el catch no respondía nada y el frontend se quedaba esperando
        res.status(500).json({msg:"Error del servidor al registrar"})
    }

}

// NUEVO: devuelve todos los registros. Es lo que necesita la tabla "Listar" para pintar filas reales.
const listar = async (req, res) => {
    try {
        // .select('-password -token') evita enviar contraseñas al navegador
        const veterinarios = await Veterinarios.find().select('-password -token').sort({createdAt: -1})
        res.json({ msg: "Listado obtenido", veterinarios })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Error del servidor al listar"})
    }
}

// NUEVO: devuelve un solo registro por su id (para la vista de detalles)
const obtenerPorId = async (req, res) => {
    try {
        const veterinario = await Veterinarios.findById(req.params.id).select('-password -token')
        if(!veterinario) return res.status(404).json({msg:"Registro no encontrado"})
        res.json({ msg: "Registro obtenido", veterinario })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Error del servidor al buscar el registro"})
    }
}

// NUEVO: elimina un registro (lo usa el ícono de basura de la tabla)
const eliminar = async (req, res) => {
    try {
        const veterinario = await Veterinarios.findByIdAndDelete(req.params.id)
        if(!veterinario) return res.status(404).json({msg:"Registro no encontrado"})
        res.json({msg:"Registro eliminado correctamente"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Error del servidor al eliminar"})
    }
}

export {
    registro,
    listar,
    obtenerPorId,
    eliminar
}
