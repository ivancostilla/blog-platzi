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
		
        const tareas = {};
        /* esto que sigue queda en el objeto como:
        primero buscamos el id de usuario(...tareas[tar.userID]),
        depues buscamos y mapeamos cada tarea de cada usuario([tar.id]) */
        respuesta.data.map((tar) => (
            //buscamos las tareas por la key userId
            tareas[tar.userId] = {
                //le ponemos todo lo q tenga ese userId:
                ...tareas[tar.userId],
                //acá vamos agregando tarea a tarea cada vez que pasa el mmap
                [tar.id]: {
                    ...tar
                }
            }
        ))
        
        dispatch({
			type: TRAER_TODAS,
			payload: tareas
		})
	} catch (error) {
		console.log("Error: ", error.message);
		dispatch({
			type: ERROR,
			payload: 'Información de tareas no disponible.',
		})
	}
};