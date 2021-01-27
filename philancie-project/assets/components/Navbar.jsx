import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const NavBar = ({ history }) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

const handleLogout = () => {
AuthAPI.logout();
setIsAuthenticated(false);
toast.info("Vous êtes déconnecté 🙂 ");
history.push('/login');
}

return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <NavLink className="navbar-brand" to="/">Philancie</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
        aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/sheets">Pages</NavLink>
            </li>
        </ul>
        <ul className="navbar-nav ml-auto">
            {(!isAuthenticated && (
            <>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Inscription</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Connexion</NavLink>
                </li>
            </>
            )) || (
                <li className="nav-item">
                    <a onClick={handleLogout} className="nav-link">Deconnexion</a>
                </li>
            )}
        </ul>
    </div>
</nav>
);
};

export default NavBar;