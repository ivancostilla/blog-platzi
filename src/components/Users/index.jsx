import React, { Component } from 'react';
import axios from "axios";

class Users extends Component {

  constructor(){
    super();
    this.state = {
      usuarios: []
    }
  }

  async componentDidMount(){
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({
      usuarios: res.data
    })
  }
  
  ponerFilas = ()=>(

    React.Children.toArray(
      this.state.usuarios.map(usuario =>(
        <tr>
          <td>
            {usuario.name}
          </td>
          <td>
            {usuario.email}
          </td>
          <td>
            {usuario.website}
          </td>
        </tr>
      ))
    )

  )

 render(){
  return (
    <div className="margin">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          { this.ponerFilas() }
        </tbody>
      </table>
    </div>  
     )
 }
}

export default Users;

