import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from "../Components/logo.png";
import './Navbar.css';

const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // Get the first letter of the username from localStorage
    const username = localStorage.getItem('username_stitch');
    const firstLetter = username ? username.charAt(0).toUpperCase() : '';

    // Function to handle logout
    const handleLogout = () => {
        // Clear username from localStorage
        localStorage.removeItem('username_stitch');
        navigate('/shop');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top">
            <div className="container">
                <div className="navbar-brand logo-container">
                    <NavLink to="/">
                        <img src={logo} style={{ width: "30px", height: "auto", marginRight: "15px" }} className="logo" alt="Logo" />
                        <span className="navbar-brand fw-bold fs-4 px-2">Stitch Switch</span>
                    </NavLink>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                    aria-controls="navbarSupportedContent"
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/shop" onClick={toggleMenu}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product" onClick={toggleMenu}>Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about" onClick={toggleMenu}>About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact" onClick={toggleMenu}>Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center ml-auto">
                        {username ? null : (
                            <>
                                <NavLink to="/login" className="btn btn-outline-light mx-2" onClick={toggleMenu}>
                                    <i className="fa fa-sign-in-alt mr-1"></i> Login
                                </NavLink>
                                <NavLink to="/register" className="btn btn-outline-light mx-2" onClick={toggleMenu}>
                                    <i className="fa fa-user-plus mr-1"></i> Register
                                </NavLink>

                            </>

                        )}
                        {username && (
                            <div className="avatar-circle" style={{ marginRight: "10px" }}><p className='avatar-text'>{firstLetter}</p></div>
                        )}
                        {username && (
                            <NavLink to="/shop" style={{margin :"0px"}} className="btn btn-outline-light mx-2" onClick={handleLogout}>
                                <i className="fa fa-sign-out-alt mr-1"></i> Logout
                            </NavLink>
                        )}
                        <NavLink to="/cart" style={{margin :"0px"}}  className="btn btn-outline-light mx-2" onClick={toggleMenu}>
                            <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
                        </NavLink>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
