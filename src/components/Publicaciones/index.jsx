import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../Redux/actions/usuariosActions'
import * as publicacionesActions from '../../Redux/actions/publicacionesActions'

class Publicaciones extends Component {
    componentDidMount() {
        //al usar mas de 1 reduce hay que especificar a que reducer queremos entrar:
        if(!this.props.usuariosReducers.usuarios.length) {
            this.props.traerTodos();
        }
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Publicaciones de usuario</h1>
                { this.props.match.params.key }
            </div>
        )
    }
}
const mapStateToProps = ({ 
    usuariosReducers,
    publicacionesReducer}) => {
	    return {
            usuariosReducers,
            publicacionesReducer
        };
};

/* esto se hace cuando tenemos mas de 1 actions */
const mapDispatchToProps = {
    ...usuariosActions,
    ...publicacionesActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);