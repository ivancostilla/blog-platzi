import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as usuariosActions from '../../Redux/actions/usuariosActions'
import * as publicacionesActions from '../../Redux/actions/publicacionesActions'

/* destructuramos para modifica r el nombre de la funcion, ya que en
los 2 actions que tenemos le pusimos el mismo nobre a la funcion */
const {traerTodos: usuariosTraerTodos } = usuariosActions;
const {traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {
    async componentDidMount() {
        const {
            /* destructuracion para evitar lineas largas */
            /* evitar hacer destructuring en funciones que contengan estados
            ya que la info puede variar */
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: {params: { key } }
        } = this.props
        //al usar mas de 1 reduce hay que especificar a que reducer queremos entrar:
        if(!this.props.usuariosReducers.usuarios.length) {
            await this.props.usuariosTraerTodos();
        }
        if (this.props.usuariosReducers.error) {
            return
        }
        if (!('publicaciones_key' in this.props.usuariosReducers.usuarios[key])) {   
            //enviamos la key a la funcion para saber el id del usuario
            publicacionesTraerPorUsuario(key)
        }
    }
    ponerUsuario = () =>{
        const { 
            usuariosReducers,
            match: { params: { key } }
        } = this.props;

        if (usuariosReducers.error) {
            return <Fatal mensaje={ usuariosReducers.error } />
        }
        if (!usuariosReducers.usuarios.length || usuariosReducers.cargando){
            return <Spinner />
        }
        const nombre = usuariosReducers.usuarios[key].name;
        return (
            <h1>Publicaciones de { nombre }</h1>
        )
    }
    render() {
        console.log(this.props)
        return (
            <div>
                { this.ponerUsuario() }
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