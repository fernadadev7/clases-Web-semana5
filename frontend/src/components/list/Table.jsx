// CAMBIO: se agregan hooks, la petición al backend y la navegación.
// IMPORTANTE: NO se cambió ninguna clase de Tailwind ni etiqueta visual: la tabla se ve igual.
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { MdDeleteForever, MdInfo,MdPublishedWithChanges } from "react-icons/md"
import { useFetch } from "../../hooks/useFetch"

// CAMBIO: URL base del backend (la misma que ya usa Register.jsx)
const URL = "http://localhost:3000/api"

const Table = () => {

    // CAMBIO: antes la fila era fija (un "1" y guiones "--"). Ahora guardamos lo que devuelve la BD.
    const [veterinarios, setVeterinarios] = useState([])
    const { fetchDataBackend, loading } = useFetch()
    const navigate = useNavigate()

    // CAMBIO NUEVO: al cargar el componente pedimos la lista real al servidor.
    useEffect(() => {
        const cargarRegistros = async () => {
            const respuesta = await fetchDataBackend(`${URL}/`)
            if (respuesta?.veterinarios) setVeterinarios(respuesta.veterinarios)
        }
        cargarRegistros()
    }, [fetchDataBackend])

    // CAMBIO NUEVO: el ícono de información abre el detalle del registro elegido.
    const verDetalle = (id) => navigate(`/dashboard/details/${id}`)

    // CAMBIO NUEVO: el ícono de basura elimina y luego quita la fila de la pantalla.
    const eliminarRegistro = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este registro?")) return
        await fetchDataBackend(`${URL}/${id}`, null, "DELETE")
        setVeterinarios((actuales) => actuales.filter((v) => v._id !== id))
    }

    return (

        <table className="w-full mt-5 table-auto shadow-lg bg-white">

            {/* Encabezado - SIN CAMBIOS */}
            <thead className="bg-gray-800 text-slate-400">
                <tr>
                    {["N°", "Nombre mascota", "Nombre propietario", "Email", "Celular", "Estado", "Acciones"].map((header) => (
                        <th key={header} className="p-2">{header}</th>
                    ))}
                </tr>
            </thead>


            {/* Cuerpo de la tabla */}
            <tbody>

                {/* CAMBIO: antes había UNA fila escrita a mano. Ahora generamos una por cada
                    registro real. Las clases (hover:bg-gray-300 text-center, py-2, etc.) son idénticas. */}
                {veterinarios.map((veterinario, index) => (
                    <tr key={veterinario._id} className="hover:bg-gray-300 text-center">

                        <td>{index + 1}</td>
                        {/* El modelo actual no tiene campo "mascota", por eso esa columna sigue mostrando "--" */}
                        <td>{veterinario.mascota || "--"}</td>
                        <td>{`${veterinario.nombre || ""} ${veterinario.apellido || ""}`.trim() || "--"}</td>
                        <td>{veterinario.email || "--"}</td>
                        <td>{veterinario.celular || "--"}</td>
                        <td>{veterinario.status ? "Activo" : "Inactivo"}</td>

                        {/* Columna de acciones - mismos íconos y mismas clases */}
                        <td className="py-2 text-center">

                            <MdInfo
                                onClick={() => verDetalle(veterinario._id)}
                                title="Más información"
                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                            />


                            {/* Nota: el ícono de actualizar se dejó igual porque Update.jsx es solo un marcador de posición */}
                            <MdPublishedWithChanges
                                title="Actualizar"
                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                            />


                            <MdDeleteForever
                                onClick={() => eliminarRegistro(veterinario._id)}
                                title="Eliminar"
                                className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600"
                            />

                        </td>

                    </tr>
                ))}

                {/* CAMBIO NUEVO: mensaje que aparece solo cuando la base de datos está vacía,
                    para que la tabla no se vea como un error. Usa el mismo estilo que el resto. */}
                {!loading && veterinarios.length === 0 && (
                    <tr className="hover:bg-gray-300 text-center">
                        <td colSpan="7" className="p-2">No hay registros para mostrar</td>
                    </tr>
                )}

            </tbody>

        </table>
    )
}

export default Table
