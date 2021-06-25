/* eslint-disable no-undef */
import { TRAER_TODAS, CARGANDO, ERROR } from "../../types/tareasTypes";

const INICIAL_STATE = {
    tareas: {},
    cargando: false,
    error: ""
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INICIAL_STATE, action) => {
    switch (action.type){
        case TRAER_TODAS:
            return {
                ...state,
                tareas: action.payload,
                cargando: false,
                error: ''
            };

        case CARGANDO:
            return {...state, cargando: true};

        case ERROR:
            return {...state,
                error: action.payload,
                cargando: false
            }

        default: return state;
    }
}