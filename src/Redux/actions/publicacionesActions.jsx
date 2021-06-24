import axios from 'axios';
import { CARGANDO, ERROR, ACTUALIZAR } from "../../types/publicacionesTypes";
import * as usuariosTypes from '../../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

/* colocamos la prop key en la primera funcion,
en la segunda colocamos getstate
y destructuramos la key que quereos obtener de otro reducer,
en este caso usuarios de usuariosReducers,
en la variable usuario_id: paso la posicion en el objeto 
supongaamos que key = 0, entonces:
entramos al usuario 0 y el .id es la key que queremos entrar
al obtner el id lo pasamos al link y asi obtenemos las publicaciones de ese usuario */
export const traerPorUsuario = (key) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO,
    })
    
    const { usuarios } = getState().usuariosReducers;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[key].id

    try {
                
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

        const nuevasPublicaciones = respuesta.data.map((publicacion) => ({
            ...publicacion,
            comentarios: [],
            abierto: false
        }));

        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevasPublicaciones
        ];

        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        });

        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [...usuarios];
        usuarios_actualizados[key] = {
            ...usuarios[key],
            publicaciones_key
        }

        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        });
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: 'publicaciones no disponibles.'
        })
    }
};
//getState e para traer el estado actual
//abrir o cerrar publicaciones
export const abrirCerrar = (pub_key, index) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    //el primer parametro(pubkey) indica las publis de un usuario especifico
    //el segundo(index) indica en cual publicacion dimos click
    const publicacionSeleccionada = publicaciones[pub_key][index];

    const publicacionActualizada = {
        //todo lo que tenga la publcacion seleccionada:
        ...publicacionSeleccionada,
        //la propiedad abierto va a ser distinta de la propiedad que contiene la publi selec
        abierto: !publicacionSeleccionada.abierto,
    };

    const publicaciones_actualizadas = [...publicaciones];
    //aca entramos nivel x nivel:
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];
    publicaciones_actualizadas[pub_key][index] = publicacionActualizada;

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas

    })
}