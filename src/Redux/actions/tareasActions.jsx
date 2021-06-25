import axios from "axios";
import {
	TRAER_TODAS,
	CARGANDO,
	ERROR,
	CAMBIO_USUARIO_ID,
	CAMBIO_TITULO,
    AGREGADA
} from "../../types/tareasTypes";
/* 
dispatch: es el que dispara la llamada
y va acontactar al reducer paraq que haga el cambio de estado
 */
//función que retorna otra función:
// const tareas = {};
// /* esto que sigue queda en el objeto como:
        // primero buscamos el id de usuario(...tareas[tar.userID]),
        // depues buscamos y mapeamos cada tarea de cada usuario([tar.id]) */
        // respuesta.data.map((tar) => (
        //     //buscamos las tareas por la key userId
        //     tareas[tar.userId] = {
            //         //le ponemos todo lo q tenga ese userId:
            //         ...tareas[tar.userId],
        //         //acá vamos agregando tarea a tarea cada vez que pasa el mmap
        //         [tar.id]: {
        //             ...tar
        //         }
        //     }
        // ))
        
export const traerTodas = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });

    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
        
        const tareas = {};
        respuesta.data.map((tar) => (
            tareas[tar.userId] = {
                ...tareas[tar.userId],
                [tar.id]: {
                    ...tar
                }
            }
        ));

        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        })
    }
    catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Tareas no disponibles.'
        })
    }
};

export const cambioUsuarioId = (valor) => (dispatch) => {
    dispatch({
        type: CAMBIO_USUARIO_ID,
        payload: valor
    })
};

export const cambioTitulo = (valor) => (dispatch) => {
    dispatch({
        type: CAMBIO_TITULO,
        payload: valor
    })
};

export const agregar = (nueva_tarea) => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });

    try {
        const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
        console.log(respuesta)
        dispatch({
            type: AGREGADA
        });
    }
    catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR
        });
    }
};