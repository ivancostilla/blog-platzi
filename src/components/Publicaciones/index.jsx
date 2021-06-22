import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../Redux/actions/usuariosActions'
import * as publicacionesActions from '../../Redux/actions/publicacionesActions'

/* destructuramos para modifica r el nombre de la funcion, ya que en
los 2 actions que tenemos le pusimos el mismo nobre a la funcion */
const {traerTodos: usuariosTraerTodos } = usuariosActions;
const {traerTodos: publicacionesTraerTodos } = publicacionesActions;

class Publicaciones extends Component {
    componentDidMount() {
        //al usar mas de 1 reduce hay que especificar a que reducer queremos entrar:
        if(!this.props.usuariosReducers.usuarios.length) {
            this.props.usuariosTraerTodos();
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
    usuariosTraerTodos,
    publicacionesTraerTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);