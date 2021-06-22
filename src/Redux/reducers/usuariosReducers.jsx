/* eslint-disable no-undef */
import { TRAER_TODOS, CARGANDO } from "../../types/usuariosTypes";

const INICIAL_STATE = {
    usuarios: [],
    cargando: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INICIAL_STATE, action) => {
    switch (action.type){
        case TRAER_TODOS:
            return {
                ...state,
                 usuarios: action.payload,
                cargando: false};

        case CARGANDO:
            return {...state, cargando: true};

        default: return state;
    }
}