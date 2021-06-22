import axios from "axios";
import { TRAER_TODOS, CARGANDO, ERROR } from "../../types/usuariosTypes";
/* 
dispatch: es el que dispara la llamada
y va acontactar al reducer paraq que haga el cambio de estado
 */
//función que retorna otra función:
export const traerTodos = () => async (dispatch) => {
	dispatch({
		type: CARGANDO,
	})
	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
		dispatch({
			type: TRAER_TODOS,
			payload: respuesta.data
		})
	} catch (error) {
		console.log("Error: ", error.message);
		dispatch({
			type: ERROR,
			payload: 'Ups... Algo salió mal, intente mas tarde.',
		})
	}
};