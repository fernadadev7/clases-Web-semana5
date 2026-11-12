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
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    direccion:{
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
        required:true
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
//PARA CIFRAR LA CONTRASEÑA 
veterinarioSchema.method.encryptPassword=async function(){
const salt =await bcrypt.gentSalt(10);
const passwordEncryp = await bcrypt.hash(passwordUser, salt);
return passwordEncryp
}
//METODO PARA VERIFICAR SI EL PASSWORD ES VALIDO EN LA BDD
veterinarioSchema.method.matchPassword=async function(){
    await bcrypt.compare(passwordUser, this.password)

}
//METODO PARA CREA TOKEN
veterinarioSchema.method.createToken=function(){
    const tokeGenerado = randomBytes(2).toString('hex').toUpperCase()
    this.token = tokeGenerado
    return tokeGenerado

}
export default model('Veterinario',veterinarioSchema)