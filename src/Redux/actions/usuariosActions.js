import axios from "axios";
/* 
dispatch: es el que dispara la llamada
y va acontactar al reducer paraq que haga el cambio de estado
 */
//función que retorna otra función:
export const traerTodos = () => async (dispatch) => {
	const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
	dispatch({
		type: 'traer_usuarios',
		payload: respuesta.data
	})
};