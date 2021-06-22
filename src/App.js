import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './components/Menu';
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
      </div>

    </BrowserRouter>

)
}

export default App;
