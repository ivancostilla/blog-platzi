/* eslint-disable no-undef */
import { ACTUALIZAR, CARGANDO, ERROR } from "../../types/publicacionesTypes";

const INICIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: ""
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INICIAL_STATE, action) => {
    switch (action.type){
        case ACTUALIZAR:
            return {
                ...state,
                publicaciones: action.payload,
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