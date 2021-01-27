import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Field from '../components/forms/Fields';
import Pagination from '../components/Pagination';
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/authAPI';

const LoginPage = ({ history }) => {

    const {setIsAuthenticated} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username:"",
        password:""
    });

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;

        setCredentials({...credentials, [name]: value })
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes connecté")
            history.replace("/sheets");
        } catch(error) {
            setError("Aucun compte ne possède cette adresse email ou les informations ne correspondent pas");
            toast.error("Une erreur est survenue")
        }
    };

return(
<>
    <h1 className="mb-4">Connexion à l'application</h1>
    <form onSubmit={handleSubmit}>
        <Field label="Adresse email" name="username" value={credentials.username} onChange={handleChange} placeholder="Adresse email de connexion" error={error}/>
        <Field label="Mot de passe" name="password" value={credentials.password} type="password" onChange={handleChange} placeholder="Mot de passe" error={error}/>
        <div className="form-group">
            <button type="submit" className="btn btn-success mt-3">Connexion</button>
        </div>
    </form>
</>
);

};

export default LoginPage;