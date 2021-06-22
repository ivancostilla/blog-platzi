import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from "../../types/publicacionesTypes";

export const traerTodos = () => async (dispatch) => {
    dispatch({
		type: CARGANDO,
	})
	try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/posts');
		dispatch({
			type: TRAER_TODOS,
			payload: respuesta.data
		})
	} catch (error) {
		console.log("Error: ", error.message);
		dispatch({
			type: ERROR,
			payload: 'Ups... Algo salió mal, intente mas tarde',
		})
    }
}
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
    dispatch({
        type: TRAER_TODOS,
        payload: respuesta.data
    })
} 