import './css/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

//importar componentes
import Navbar from './components/Navbar';
import AñadirUsuario from './components/pages/AñadirUsuario';
import VerUsuario from './components/pages/VerUsuario';
import AñadirIntervencion from './components/pages/AñadirIntervencion';
import Citas from './components/pages/Citas';
import LogIn from './components/pages/LogIn';
import CrearTrabajador from './components/pages/CrearTrabajador';
import CambiarContrasena from './components/pages/CambiarContrasena';
import FilterSideBar from './components/FilterSideBar'
import history from './history';



function App() {
    return (
      <Router history={history}>
        {/* ! <Navbar /> */}
        <Switch>
          <Route path='/LogIn' exact component={LogIn}/>
          <Route exact path="/" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<AñadirUsuario />))}/>
          <Route exact path="/Añadir usuario" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<AñadirUsuario />))}/>
          <Route exact path="/VerUsuario" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<VerUsuario />))}/>
          <Route exact path="/Citas" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<Citas />))}/>
          <Route exact path="/AñadirIntervencion" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<AñadirIntervencion />))}/>
          <Route exact path="/CrearTrabajador" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<CrearTrabajador />))}/>
          <Route exact path="/CambiarContraseña" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<CambiarContrasena />))}/>
          <Route exact path="/SideBar" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<FilterSideBar />))}/>
        </Switch> 
      </Router>
    );
  }

 


export default App;
