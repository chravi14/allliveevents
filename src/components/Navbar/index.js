import React, { useContext } from 'react';
import './Navbar.css';
import logo from './../../assets/logo.png';
import { NavLink, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';

const Navbar = () => {
    const { currentUser, signout } = useAuth();
    const history = useHistory();
    console.log(currentUser);
    const handleSignout = () => {
        signout().then(res => {
            history.push("/admin");
        })
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <Link to="/" className="navbar-brand">
                <img src={logo} height="30" alt="" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/tournaments" className="nav-link">Tournaments</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/paramus" className="nav-link">Paramus</NavLink>
                    </li>

                    {/* {!currentUser ? (<li className="nav-item">
                        <NavLink to="/admin" className="nav-link">Admin</NavLink>
                    </li>) : (<> */}
                    {currentUser && (<><li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                    </li>
                        <li className="nav-item">
                            <NavLink to="/logout" className="nav-link" onClick={handleSignout}>Logout</NavLink>
                        </li></>)}
                    {!currentUser && (<li className="nav-item">
                        <a class="btn btn-login" href="https://aaliveevents.memberspace.com/member/sign_in">Join Now / Login</a>
                    </li>)}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
