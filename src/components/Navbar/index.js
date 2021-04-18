import React from 'react';
import './Navbar.css';
import logo from './../../assets/logo.png';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <Link to="/" className="navbar-brand">
                <img src={logo} height="30" alt="" />
            </Link>
            {/* <a className="navbar-brand" href="#">
                <img src={logo} height="30" alt="" />
            </a> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/sports" className="nav-link">Sports</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/wedding" className="nav-link">Wedding</NavLink>
                    </li>
                    <li className="nav-item">
                        <a class="btn btn-login" href="https://aaliveevents.memberspace.com/member/sign_in">Join Now / Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
