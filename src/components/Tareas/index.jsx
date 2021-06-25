import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import * as tareasActions from '../../Redux/actions/tareasActions';
import { Link } from 'react-router-dom';

class Tareas extends Component {
    componentDidMount() {
        if (!Object.keys(this.props.tareas).length){
            this.props.traerTodas()
        }
    }

    componentDidUpdate() {
        if (!Object.keys(this.props.tareas).length){
            this.props.traerTodas()
        }
    }

    mostrarContenido = () => {
        const {tareas, cargando, error } = this.props;

        if (error) {
            return <Fatal mensaje={error}/>
        };
        if (cargando) {
            return <Spinner />
        };

        return (
            <div>
                <button>
                <Link to="/tareas/guardar">
                    Agregar
                </Link>
                </button>
                {Object.keys(tareas).map((user_id) => (
                    React.Children.toArray(
                        <div>
                            <h2>
                                Usuario {user_id}
                            </h2>
                            <div className="contenedor_tareas">
                                { this.ponerTareas(user_id) }
                            </div>
                        </div>
                    )
                    ))
                }
            </div>
        )
    };

    ponerTareas = (user_id) => {
        const { tareas, cambioCheck, eliminar } = this.props;
        const por_usuario = {
            ...tareas[user_id]
        }

        return Object.keys(por_usuario).map((tarea_id) => (
                    React.Children.toArray(
                        <div>
                            <input 
                            type="checkbox" 
                            defaultChecked={por_usuario[tarea_id].completed}
                            onChange={
                                () => cambioCheck(user_id, tarea_id)
                            }
                            />
                            {por_usuario[tarea_id].title}
                            <button
                            className="m-left"
                            >
                                <Link to={`/tareas/guardar/${user_id}/${tarea_id}`}>
                                    Editar    
                                </Link>
                            </button>
                            <button
                            className="m-left"
                            onClick={()=> eliminar(tarea_id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    )
                ))
               
    }

    render() {
        return (
            <div>
                {this.mostrarContenido()}
            </div>
        )
    }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);