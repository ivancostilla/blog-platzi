import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Comentarios from '../Comentarios';

import * as usuariosActions from '../../Redux/actions/usuariosActions'
import * as publicacionesActions from '../../Redux/actions/publicacionesActions'

/* destructuramos para modifica r el nombre de la funcion, ya que en
los 2 actions que tenemos le pusimos el mismo nobre a la funcion */
const {traerTodos: usuariosTraerTodos } = usuariosActions;
const {
    traerPorUsuario: publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
} = publicacionesActions;

class Publicaciones extends Component {
    async componentDidMount() {
        const {
            /* destructuracion para evitar lineas largas */
            /* evitar hacer destructuring en funciones que contengan estados
            ya que la info puede variar */
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
    //validamos que la info del usuario esté:
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
            <h1 className="center">Publicaciones de { nombre }</h1>
        )
    }
    

    //validamos que la info del usuario sea la correcta:
    ponerPublicaciones = () => {
        const {
            usuariosReducers,
            usuariosReducers: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this.props;

        if (!usuarios.length) return;
        if (usuariosReducers.error) return;

        if (publicacionesReducer.cargando) {
            return <Spinner/>
        }

        if (publicacionesReducer.error) {
            return <Fatal mensaje={ publicacionesReducer.error } />
        }

        if (!publicaciones.length) return;

        if (!('publicaciones_key' in usuarios[key])) return;

        const { publicaciones_key } = usuarios[key];

        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        )
    };

    mostrarInfo = (publicaciones,pub_key) => (
        React.Children.toArray(
            publicaciones.map((publicacion, index) => (
                <div
                className="pub-titulo"
                onClick={() => {this.mostrarComentarios(pub_key, index, publicacion.comentarios)}}
                >
                    <h2>
                    {index + 1}- { publicacion.title }
                    </h2>
                    <h3>
                       { publicacion.body.charAt(0).toUpperCase() + publicacion.body.slice(1) }
                    </h3>
                    {
                        (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios} /> : ''
                    }
                </div>
            ))
        )
    );

    mostrarComentarios = (pub_key, index, comentarios) => {
        this.props.abrirCerrar(pub_key,index);
        if(!comentarios.length) {
            this.props.traerComentarios(pub_key, index)
        };
    }
    
    render() {
        console.log(this.props)
        return (
            <div>
                { this.ponerUsuario() }
                { this.ponerPublicaciones() }
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
    publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);