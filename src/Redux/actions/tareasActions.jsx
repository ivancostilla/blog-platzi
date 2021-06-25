import axios from "axios";
import { TRAER_TODAS, CARGANDO, ERROR } from "../../types/tareasTypes";
/* 
dispatch: es el que dispara la llamada
y va acontactar al reducer paraq que haga el cambio de estado
 */
//función que retorna otra función:
export const traerTodas = () => async (dispatch) => {
	dispatch({
		type: CARGANDO,
	})
	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
		dispatch({
			type: TRAER_TODAS,
			payload: respuesta.data
		})
	} catch (error) {
		console.log("Error: ", error.message);
		dispatch({
			type: ERROR,
			payload: 'Información de tareas no disponible.',
		})
	}
};