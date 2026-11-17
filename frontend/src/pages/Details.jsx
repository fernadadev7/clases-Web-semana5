/* eslint-disable no-unused-vars */
// CAMBIO NUEVO: importamos los hooks para leer el id de la URL y pedir el registro al backend.
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import TableTreatments from "../components/treatments/Table"
import ModalTreatments from "../components/treatments/Modal"
import { useFetch } from "../hooks/useFetch"



const Details = () => {

    // CAMBIO NUEVO: antes esta página tenía todos los datos vacíos.
    // Ahora toma el id de /dashboard/details/:id y carga ese registro real.
    const { id } = useParams()
    const { fetchDataBackend } = useFetch()
    const [registro, setRegistro] = useState(null)

    const [treatments, setTreatments] = useState(["demo"])

    useEffect(() => {
        const cargarRegistro = async () => {
            const respuesta = await fetchDataBackend(`http://localhost:3000/api/${id}`)
            if (respuesta?.veterinario) setRegistro(respuesta.veterinario)
        }
        cargarRegistro()
    }, [id, fetchDataBackend])


    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar</h1>
                <hr className='my-4 border-t-2 border-gray-300' />
                <p className='mb-8'>Este módulo te permite visualizar todos los datos</p>
            </div>


            <div>
                <div className='m-5 flex justify-between'>

                    <div>


                        <ul className="list-disc pl-5">

                            <li className="text-md text-gray-00 mt-4 font-bold text-xl">Datos del propietrio</li>


                            {/* Datos del propietario */}
                            <ul className="pl-5">

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Cédula: </span>
                                    {/* CAMBIO: el modelo no tiene cédula, mostramos "--" en vez de dejarlo vacío */}
                                    {registro ? "--" : "..."}
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Nombres completos: </span>
                                    {/* CAMBIO: antes estaba vacío, ahora muestra nombre + apellido reales */}
                                    {registro ? `${registro.nombre || ""} ${registro.apellido || ""}`.trim() || "--" : "..."}
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Correo electrónico: </span>
                                    {/* CAMBIO: antes estaba vacío, ahora muestra el email real */}
                                    {registro?.email || "..."}
                                </li>

                                <li className="text-md mt-2">
                                <span className="text-gray-600 font-bold">Celular: </span>
                                {/* CAMBIO: antes estaba vacío, ahora muestra el celular real */}
                                {registro?.celular || "..."}
                                </li>

                            </ul>



                            <li className="text-md text-gray-00 mt-4 font-bold text-xl">Datos de la mascota</li>


                            {/* Datos del paciente */}
                            <ul className="pl-5">

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Nombre: </span>
                                    {/* El modelo actual no guarda mascotas, por eso se muestra "--" */}
                                    {registro ? "--" : "..."}
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Tipo: </span>
                                    {registro ? "--" : "..."}
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Fecha de nacimiento: </span>
                                    {registro ? "--" : "..."}
                                </li>

                                <li className="text-md mt-2">
                                    <span className="text-gray-600 font-bold">Estado: </span>
                                    <span className="bg-blue-100 text-green-500 text-xs font-medium 
                                        mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {/* CAMBIO: antes la insignia estaba vacía */}
                                        {registro ? (registro.status ? "Activo" : "Inactivo") : "..."}
                                    </span>
                                </li>

                                <li className="text-md text-gray-00 mt-4">
                                    <span className="text-gray-600 font-bold">Observación: </span>
                                    {/* CAMBIO: reutilizamos la dirección guardada como observación */}
                                    {registro?.direccion || "..."}
                                </li>
                            </ul>

                        </ul>

                    </div>
                    
                    
                    {/* Imagen lateral */}
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/2138/2138440.png" 
                            alt="dogandcat" className='h-80 w-80' />
                    </div>
                </div>


                <hr className='my-4 border-t-2 border-gray-300' />


                {/* Sección de tratamientos */}
                <div className='flex justify-between items-center'>


                    {/* Apertura del modal tratamientos */}
                    <p>Este módulo te permite gestionar tratamientos</p>
                    {
                        true &&
                        (
                            <button className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
                                Registrar
                            </button>
                        )
                    }

                    {false  && (<ModalTreatments/>)}

                </div>
                

                {/* Mostrar los tratamientos */}
                {
                    treatments.length == 0
                        ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">No existen registros</span>
                        </div>
                        :
                        <TableTreatments treatments={treatments} />
                }
                
            </div>
        </>

    )
}

export default Details