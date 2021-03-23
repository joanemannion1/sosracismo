import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import Dropdown from './Dropdown';
import history from '../history';

function Navbar() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);
    
    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(true);
        }
      };
    
    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(true);
        }
    };
    
    const logout = () => {
        localStorage.removeItem("token");
        history.push('/LogIn');
    }

    return (
        <>
            <nav className='navbar'>
                <button type="button" onClick={logout}>Log out</button>
                <Link to="/" className='navbar-logo' onClick={closeMobileMenu}>
                    Sos Racismo
                    <i className='fas fa-hand-paper' />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Inicio
                        </Link>
                    </li>
                    <li className='nav-item'
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <Link to='/usuario' className='nav-links' onClick={closeMobileMenu}>
                            Usuarios <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown && <Dropdown />}
                    </li>

                    <li className='nav-item'>
                        <Link to='/Citas' className='nav-links' onClick={closeMobileMenu}>
                            Citas
                        </Link>
                    </li>

                </ul>
            </nav>
        </>
    );
}



export default Navbar;