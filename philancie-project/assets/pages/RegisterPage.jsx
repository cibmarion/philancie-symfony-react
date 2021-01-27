import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Fields';
import { toast } from 'react-toastify';
import UsersAPI from "../services/usersAPI";

const RegisterPage = ({ history }) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
});

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            toast.error("Des erreurs dans votre formulaire !");
            return;
        }
    
        try {
            await UsersAPI.register(user);
            setErrors({});
            toast.success("Vous êtes désormais inscrit, vous pouvez vous connecter !");
            history.replace("/login");
        } catch (error) {
            const { violations } = error.response.data;
                if (violations) {
                    violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans votre formulaire !");
        }
    };

return (<>
    <h1 className="mb-4">Inscription</h1>
    <form onSubmit={handleSubmit}>
        <Field label="Prénom" name="firstName" value={user.firstName} onChange={handleChange} placeholder="Prénom" error={errors.firstName}/>
        <Field label="Nom" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Nom" error={errors.lastNAme}/>
        <Field label="Adresse email" name="email" type="email" value={user.email} onChange={handleChange} placeholder="Adresse email de connexion" error={errors.email}/>
        <Field label="Mot de passe" name="password" value={user.password} type="password" onChange={handleChange} placeholder="Mot de passe" error={errors.password}/>
        <Field label="Confirmation du mot de passe" name="passwordConfirm" type="password" value={user.passwordConfirm} type="password" onChange={handleChange} placeholder="Confirmez votre mot de passe" error={errors.passwordConfirm}/>
        <div className="form-group">
            <button type="submit" className="btn btn-success mt-3 mr-2">Inscription</button>
            <Link to="/login" className="btn btn-secondary mt-3">Retour</Link>
        </div>
    </form>
</>)
}

export default RegisterPage;