import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usuariosActions from '../../Redux/actions/usuariosActions';
class Usuarios extends Component {

	componentDidMount() {
		this.props.traerTodos();
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
			</div>
		)
	}
};

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);