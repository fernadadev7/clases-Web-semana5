//importamos la gasolina
import axios from 'axios'

// CAMBIO: agregamos useCallback para que la función no se recree en cada render.
// Esto evita un bucle infinito si la usamos dentro de useEffect (como en la tabla).
import { useState, useCallback } from 'react'
import {toast} from "react-toastify"

export function useFetch(){
    const [loading, setLoading]= useState(false)
    const fetchDataBackend = useCallback(async(url,data=null, method="GET", headers={})=>{
        const loadingToast = toast.loading("Procesando solicitud ...............")
        setLoading(true)
        try{
            const response = await axios ({
                method,
                url,
            headers:{
                "Content-Type":"application/json",
                ...headers,
            },
            data
            });
            toast.dismiss(loadingToast);
            // CAMBIO: solo mostramos el aviso de éxito si el backend envió un "msg".
            // Antes siempre salía un raro "undefined" cuando la respuesta era una lista.
            if(response?.data?.msg) toast.success(response.data.msg);
            return response?.data;

        }catch (error){
            toast.dismiss(loadingToast);
            toast.error(error.response?.data?.msg || "ocurrio un erro inesperado")
            console.error(error);
        }

        finally{
            // CAMBIO: antes decía solo "setLoading" (sin paréntesis ni valor),
            // por eso el estado de carga nunca volvía a false.
            setLoading(false)
        }
    }, [])
    return{fetchDataBackend,loading}

}
