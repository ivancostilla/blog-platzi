import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usuariosActions from '../../Redux/actions/usuariosActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Tabla from '../Tabla';
class Usuarios extends Component {

	componentDidMount() {
		this.props.traerTodos();
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
		return (
			<div>
				{this.ponerContenido()}
			</div>
		)
	}
};

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);