import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = props => {
    return(
    <div className="jumbotron">
        <h1 className="display-3">Bienvenue sur Philancie</h1>
        <p className="lead">L'outil qui permet la création, la modification et l'illustration collaboratives de pages.</p>
        <hr className="my-4" />
        <p className="lead">
            <Link to="/register" className="btn btn-primary btn-lg">S'inscrire</Link>
        </p>
    </div>
    );
};

export default HomePage;