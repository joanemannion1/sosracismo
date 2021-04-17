import './css/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import auth from './components/auth'
//importar componentes
import AñadirUsuario from './components/pages/AñadirUsuario';
import VerUsuario from './components/pages/VerUsuario';
import AñadirIntervencion from './components/pages/AñadirIntervencion';
import Citas from './components/pages/Citas';
import LogIn from './components/pages/LogIn';
import CrearTrabajador from './components/pages/CrearTrabajador';
import CambiarContrasena from './components/pages/CambiarContrasena';
import FilterSideBar from './components/FilterSideBar'
import AñadirCaso from './components/pages/AñadirCaso'
import VerCaso from './components/pages/VerCaso'
import CrearSede from './components/pages/AñadirSede'
import VerCasosNoFinalizados from './components/pages/VerCasosNoFinalizados'
import VerIntervenciones from './components/pages/VerIntervenciones'
import ExportExcel from './components/pages/ExportExcel'
import history from './history';
import axios from 'axios';

function App() {
  
    console.log(auth.isAuthenticated())

    return (
      <Router history={history}>
        <Switch>
          <Route path='/LogIn' exact component={LogIn}/>
          <Route exact path="/" render={() => (<AñadirUsuario />)}/>
          <Route exact path="/ExportExcel" render={(match) => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<ExportExcel />))}/>
          <Route exact path="/AñadirUsuario" render={({match}) => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<AñadirUsuario usuario={false}/>))}/>
          <Route exact path="/AñadirUsuario/:usuario" render={({match}) => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<AñadirUsuario usuario={match.params.usuario}/>))}/>
          <Route exact path="/AñadirCaso/:usuario" render={({match}) => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<AñadirCaso user={match.params.usuario} />))}/>
          <Route exact path="/VerCaso/:caso" render={({match}) => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<VerCaso casoId={match.params.caso} />))}/>
          <Route exact path="/VerUsuario" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<VerUsuario />))}/>
          <Route exact path="/Citas" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<Citas />))}/>
          <Route exact path="/AñadirIntervencion/:caso" render={({match}) => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<AñadirIntervencion caso={match.params.caso}/>))}/>
          <Route exact path="/CrearTrabajador" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<CrearTrabajador />))}/>
          <Route exact path="/CambiarContraseña" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<CambiarContrasena />))}/>
          <Route exact path="/SideBar" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<FilterSideBar />))}/>
          <Route exact path="/CasosNoFinalizados" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<VerCasosNoFinalizados />))}/>
          <Route exact path="/CrearSede" render={() => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<CrearSede />))}/>
          <Route exact path="/VerIntervencion/:caso" render={({match}) => ((!localStorage.getItem('token')) ? <Redirect to="/LogIn"/> : (<VerIntervenciones casoId={match.params.caso}/>))}/>
        </Switch> 
      </Router>
    );
  }

 


export default App;
