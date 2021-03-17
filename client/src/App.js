import './css/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//importar componentes
import Navbar from './components/Navbar';
import AñadirUsuario from './components/pages/AñadirUsuario';
import VerUsuario from './components/pages/VerUsuario';
import AñadirIntervencion from './components/pages/AñadirIntervencion';
import Citas from './components/pages/Citas';
import LogIn from './components/pages/LogIn';
import CrearTrabajador from './components/pages/CrearTrabajador';
import CambiarContrasena from './components/pages/CambiarContrasena';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/AnadirUsuario' exact component={AñadirUsuario}/>
        <Route path='/VerUsuario' exact component={VerUsuario}/>
        <Route path='/Citas' exact component={Citas}/>
        <Route path='/AñadirIntervencion' exact component={AñadirIntervencion}/>
        <Route path='/LogIn' exact component={LogIn}/>
        <Route path='/CrearTrabajador' exact component={CrearTrabajador}/>
        <Route path='/CambiarContrasena' exact component={CambiarContrasena}/>
      </Switch>
    </Router>
  );
}

export default App;
