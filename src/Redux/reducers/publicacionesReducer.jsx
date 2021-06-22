/* eslint-disable no-undef */
// import { TRAER_TODOS, CARGANDO, ERROR } from "../../types/usuariosTypes";

const INICIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: ""
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INICIAL_STATE, action) => {
    switch (action.type){
        
        default: return state;
    }
}