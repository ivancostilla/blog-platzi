import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="menu-link">
            <Link className="link" to="/">Usuarios</Link>
            <Link className="link" to="/tareas">Tareas</Link>
        </nav>
    )
}

export default Menu;