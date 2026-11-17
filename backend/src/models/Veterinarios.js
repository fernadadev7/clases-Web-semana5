//AQUI SE VA A RESGISTRAR LOS VETENERINAROS
// se consulta en la pagina oficial de monongose en esquemas

import mongoose, { model } from 'mongoose';
import bcrypt from 'bcrypt';
import {randomBytes} from 'node:crypto'
const { Schema } = mongoose;
const veterinarioSchema= new Schema({
    //se va usar una base de datos no SQL
    nombre:{
        type:String,
        required:true,   // CAMBIO: antes decía "require" (mal escrito) y Mongoose no lo aplicaba
        trim:true
    },
    apellido:{
        type:String,
        required:true,   // CAMBIO: antes decía "require"
        trim:true
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    // CAMBIO (NUEVO): agrego "celular" porque el formulario de registro lo envía
    // y la columna "Celular" de la tabla necesita un campo real para mostrar información
    celular:{
        type:String,
        trim:true,
        default:null
    },
    email:{
        type:String,
        trim:true,
        unique:true //para registrar correos unicos
    },
    password:{
        type:String,
        required:true   // CAMBIO: antes decía "require"
    }, status:{
        type:Boolean,
        default:true
    },
    token:{
        type:String,
        default:null
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },

},
{timestamps: true}
);


//VOY DEFINIR EL PRIMER METODO
//metodos personalizados
//CAMBIO: antes era "veterinarioSchema.method" (singular).
//Mongoose solo registra los métodos escritos con "methods" (plural), por eso no existían.
//PARA CIFRAR LA CONTRASEÑA
veterinarioSchema.methods.encryptPassword=async function(password){
    const salt =await bcrypt.genSalt(10);   // CAMBIO: antes "bcrypt.gentSalt" (tipoo), el método es genSalt
    // CAMBIO: antes se usaba "passwordUser", una variable que no existía en ningún lado.
    // Ahora la contraseña llega como parámetro.
    const passwordEncryp = await bcrypt.hash(password, salt);
    return passwordEncryp
}
//METODO PARA VERIFICAR SI EL PASSWORD ES VALIDO EN LA BDD
veterinarioSchema.methods.matchPassword=async function(password){
    // CAMBIO: recibe la contraseña por parámetro, usa this.password y DEVUELVE el resultado
    return await bcrypt.compare(password, this.password)
}
//METODO PARA CREA TOKEN
veterinarioSchema.methods.createToken=function(){
    const tokeGenerado = randomBytes(2).toString('hex').toUpperCase()
    this.token = tokeGenerado
    return tokeGenerado

}
                    //nombre del modelo //llamo al esquema del modelo
export default model('Veterinario',veterinarioSchema)
