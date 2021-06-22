import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usuariosActions from '../../Redux/actions/usuariosActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal'
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
			<table className="table">
				<thead>
					<tr>
						<th>
							Nombre
						</th>
						<th>
							Correo
						</th>
						<th>
							Enlace
						</th>
					</tr>
				</thead>
				<tbody>
					{ this.ponerFilas() }
				</tbody>
			</table>
		)
	}

    ponerFilas = () => this.props.usuarios.map((usuario) => (
        React.Children.toArray(
    	    <tr>
    	    	<td>
    	    		{ usuario.name }
    	    	</td>
    	    	<td>
    	    		{ usuario.email }
    	    	</td>
    	    	<td>
    	    		{ usuario.website }
    	    	</td>
    	    </tr>
        )
    ));

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