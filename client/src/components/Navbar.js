
import React, { useState, useEffect } from 'react';
import '../css/Navbar.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import { authenticationService } from '../_services';

function Menu() {
    const [isAdmin, setIsAdmin] = useState(0)
    let currentUser = ''
    const getAdmin = () => {
        if (authenticationService.currentUserValue) {
            currentUser = authenticationService.currentUserValue
        }
        axios.get("http://localhost:8080/authenticate/trabajador", {
            headers: { 'x-access-token': currentUser.token },
        }).then((response) => {
            setIsAdmin(response.data.admin)
        })

    }

    const trabajadorDropdown = () => {
        return (
            <NavDropdown title="Trabajadores" id="collasible-nav-dropdown">
                <NavDropdown.Item><Link to='/VerTrabajadores' className='nav-links'>Ver Trabajadores</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/CrearTrabajador' className='nav-links'>Añadir Trabajador</Link></NavDropdown.Item>
            </NavDropdown>
        )
    }

    const casoDropdown = () => {
        return (
            <NavDropdown title="Casos" id="collasible-nav-dropdown">
                <NavDropdown.Item><Link to='/CasosNoFinalizados' className='nav-links'>Mis Casos</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/VerCasosTotales' className='nav-links'>Todos los Casos</Link></NavDropdown.Item>
            </NavDropdown>
        )
    }


    const navDropdownTitle = (<><AccountCircleIcon /> Mi perfil</>);
    useEffect(() => { getAdmin() }, []);
    return (
        <>
            <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
                <Navbar.Brand> <Link to='/' className='navbar-logo' style={{ paddingLeft: 60 }}>
                    Sos racismo
                        </Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Usuarios" id="collasible-nav-dropdown">
                            <NavDropdown.Item><Link to='/SideBar' className='nav-links'>Ver Usuarios</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to='/AñadirUsuario' className='nav-links'>Añadir Usuario</Link></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link>  <Link to='/Citas' className='navbar-logo'>
                            Calendario
                        </Link></Nav.Link>
                        {isAdmin 
                            ?casoDropdown() 
                            : <Nav.Link> <Link to='/CasosNoFinalizados' className='navbar-logo'>Casos</Link></Nav.Link>
                        }
                        {isAdmin ? trabajadorDropdown() : null}
                        
                    </Nav>
                    <Nav>
                        <NavDropdown title={navDropdownTitle} id="collasible-nav-dropdown" style={{ paddingRight: 60 }}>
                            <NavDropdown.Item><Link to='/CambiarContraseña' className='nav-links'>Cambiar Contraseña</Link></NavDropdown.Item>
                            {isAdmin ? <NavDropdown.Item><Link to='/CrearSede' className='nav-links'>Crear sede</Link></NavDropdown.Item> : null}
                            {isAdmin ? <NavDropdown.Item><Link to='/VerSedes' className='nav-links'>Ver sedes</Link></NavDropdown.Item> : null}
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to='/LogOut' className='nav-links'>Log out</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Menu;
