import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usuariosActions from '../../Redux/actions/usuariosActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Tabla from '../Tabla';
class Usuarios extends Component {
//3 manejos de estados obligatorios de un proyecto
//1-cargando
//2- error
//3-exitoso
	componentDidMount() {
		/*  evitar que recargue la pagina cuando entramos a las
		 publicaciones y volvemos a usuarios*/
		if (!this.props.usuarios.length){
			this.props.traerTodos();
		}
	}

	ponerContenido = () => {
		//agregamos un spinner
		if(this.props.cargando){
			return (
				<Spinner />
			)
		}
		
		if(this.props.error){
			return <Fatal mensaje={ this.props.error }/>
		}

		return (
			<>
				<h1>Usuarios</h1>
				<Tabla />
			</>
		)
	}

	render() {
		console.log(this.props)
		return (
			<div>
				{this.ponerContenido()}
			</div>
		)
	}
};

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducers;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);