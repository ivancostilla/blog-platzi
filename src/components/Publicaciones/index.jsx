import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../Redux/actions/usuariosActions'
import * as publicacionesActions from '../../Redux/actions/publicacionesActions'

/* destructuramos para modifica r el nombre de la funcion, ya que en
los 2 actions que tenemos le pusimos el mismo nobre a la funcion */
const {traerTodos: usuariosTraerTodos } = usuariosActions;
const {traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {
    async componentDidMount() {
        //al usar mas de 1 reduce hay que especificar a que reducer queremos entrar:
        if(!this.props.usuariosReducers.usuarios.length) {
            await this.props.usuariosTraerTodos();
        }
        //enviamos la key a la funcion para saber el id del usuario
        this.props.publicacionesTraerPorUsuario(this.props.match.params.key)
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
    publicacionesTraerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);