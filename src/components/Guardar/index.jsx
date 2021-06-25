import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tareasActions from '../../Redux/actions/tareasActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import { Redirect } from 'react-router-dom';
class TareasGuardar extends Component {
    
    componentDidMount() {
        const {
            match: { params: {user_id, tarea_id} },
            tareas,
            cambioUsuarioId,
            cambioTitulo,
            limpiarForm
        } = this.props

        if (user_id && tarea_id) {
            const tarea = tareas[user_id][tarea_id]
            cambioUsuarioId(tarea.userId);
            cambioTitulo(tarea.title)
        } else {
            limpiarForm()
        }
    }

    cambioUsuarioId = (event) => {
        this.props.cambioUsuarioId(event.target.value)
    };
    cambioTitulo = (event) => {
        this.props.cambioTitulo(event.target.value)
    };
    guardar = () => {
        const {
            match: { params: {user_id, tarea_id} },
            tareas,
            usuario_id,
            titulo,
            agregar,
            editar
        } = this.props;

        const nueva_tarea = {
            userId: usuario_id,
            title: titulo,
            completed: false
        };

        if (user_id && tarea_id) {
            const tarea = tareas[user_id][tarea_id];
            const tarea_editada = {
                ...nueva_tarea,
                completed: tarea.completed,
                id: tarea.id
            };
            editar(tarea_editada)
        } else {
            agregar(nueva_tarea);
        }
    };

    deshabilitar = () => {
        const { titulo, usuario_id, cargando } = this.props;

        if (cargando) {
            return true   
        };
        if (!usuario_id || !titulo) {
            return true
        };

        return false;
    };
    mostrarAccion = () => {
        const { error, cargando } = this.props;
        if (cargando) return <Spinner />
        if (error) return <Fatal mensaje={error} />
    }

    render() {
        return (
            <div>
                {this.props.regresar ? <Redirect to='/tareas' /> : ''}
                <h1>
                    Gardar Tarea
                </h1>
                Usuario id:
                <input 
                type="number" 
                value={ this.props.usuario_id }
                onChange={this.cambioUsuarioId }
                />
                <br /><br />
                Titulo:
                <input 
                type="text"
                value={ this.props.titulo } 
                onChange={ this.cambioTitulo }
                />
                <br /><br />
                <button
                disabled={ this.deshabilitar() }
                onClick={ this.guardar }
                >
                    Guardar
                </button>
                { this.mostrarAccion() }
            </div>
        )
    }
}
const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(TareasGuardar);