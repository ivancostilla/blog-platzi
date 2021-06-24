/* el componente se comunica con los actions, 
que este se comunica con los reducers y estos reducers
 envian la info al componente, toda la info se almacena en el store */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Publicaciones from './components/Publicaciones';
import Users from './components/Users';

const Tareas = ()=>(
  <div>Tareas</div>
)

const App = () => {

  return(

    <BrowserRouter>
      <Menu />
      <div className="margin">
        <Route exact path="/" component={ Users }></Route>
        <Route exact path="/tareas" component={ Tareas }></Route>
        <Route exact path="/publicaciones/:key" component={ Publicaciones }></Route>
      </div>
    </BrowserRouter>

)
}

export default App;
