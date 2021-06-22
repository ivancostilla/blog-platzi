/* eslint-disable no-undef */
const INICIAL_STATE = {
    usuarios: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INICIAL_STATE, action) => {
    switch (action.type){
        case 'traer_usuarios':
            return {...state, usuarios: action.payload}

            default: return state;
    }
}