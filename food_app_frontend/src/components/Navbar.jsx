import React, { useContext, useState } from 'react'

import { assets } from '../assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../context/Contextapi';
import { faCartShopping, faSearch, faBagShopping, faSignOut, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Navbar = ({ setShowLogin }) => {
    const location = useLocation()
    const [menu, setMenu] = useState('home');

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }
    const links = [
        {
            name: "home",
            path: "/"
        },
        {
            name: "menu",
            path: "#explore-menu"
        },
        {
            name: "mobile-app",
            path: "#app-download"
        },
        {
            name: "contact",
            path: "#footer"
        }
    ]
    return (
        <div className='navbar'>
            <Link to='/'> <img src={assets.header_pic} alt="" className='logo' /></Link>
            <div className='navbar-links'>
                <ul className="navbar-menu">
                    <Link to='/' onClick={() => setMenu('Home')} className={menu === 'Home' ? 'active' : ''}>home</Link>
                    <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>menu</a>
                    <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>mobile-app</a>
                    <a href='#footer' onClick={() => setMenu('contact')} className={menu === 'contact' ? 'active' : ''}>contact</a>
                </ul>
            </div>

            <div className="navbar-cart">

                <FontAwesomeIcon icon={faSearch} className='fontawesome-search' />
                <div className="search-icon">
                    <Link to='/cart'>
                        <FontAwesomeIcon icon={faCartShopping} className='fontawesome-basket' />

                    </Link>
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)} className='btn' type='button'>sign in</button>
                    : <div className='navbar-profile'>
                        <FontAwesomeIcon icon={faUserCircle} className='fontawesome-basket' data-testid="user-circle-icon" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <FontAwesomeIcon icon={faBagShopping} className='fontawesome-basket' />

                                <p>Orders</p></li>
                            <hr />
                            <li onClick={logout}>
                                <FontAwesomeIcon icon={faSignOut} className='fontawesome-basket' />

                                <p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar