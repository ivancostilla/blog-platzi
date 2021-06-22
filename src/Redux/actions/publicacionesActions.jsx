import axios from 'axios';
import { TRAER_POR_USUARIO } from "../../types/publicacionesTypes";
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
    
    const { usuarios } = getState().usuariosReducers;
    const usuario_id = usuarios[key].id
    
    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

    const { publicaciones } = getState().publicacionesReducer;

    const publicaciones_actualizadas = [
        ...publicaciones,
        respuesta.data
    ];

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

    dispatch({
        type: TRAER_POR_USUARIO,
        payload: publicaciones_actualizadas
    });
} 