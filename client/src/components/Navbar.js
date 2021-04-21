
import React, { useState } from 'react';
import '../css/Navbar.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import auth from './auth';

function Menu() {
    const navDropdownTitle = (<><AccountCircleIcon /> Mi perfil</>);
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
                        <Nav.Link>  <Link to='/CasosNoFinalizados' className='navbar-logo'>
                            Casos
                        </Link></Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={navDropdownTitle} id="collasible-nav-dropdown" style={{ paddingRight: 60 }}>
                            <NavDropdown.Item><Link to='/CambiarContraseña' className='nav-links'>Cambiar Contraseña</Link></NavDropdown.Item>
                           
                            <NavDropdown.Item><Link to='/CrearTrabajador' className='nav-links'>Añadir Trabajador</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to='/CrearSede' className='nav-links'>Crear sede</Link></NavDropdown.Item>
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
