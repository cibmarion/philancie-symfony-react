import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Fields';
import axios from 'axios';
import sheetsAPI from '../services/sheetsAPI';
import { toast } from 'react-toastify';

const SheetPage  = ({match, history}) => {

const { id = "new" } = match.params;

const [sheet, setSheet] = useState({
    subject: "",
    content: ""
})

const [errors, setErrors] = useState({
    subject: "",
    content: ""
})

const [editing, setEditing] = useState(false);

const fetchSheet = async id => {
    try{
        const { subject, content } = await sheetsAPI.find(id);
        setSheet({ subject, content });
    } catch(error){
        toast.error("Impossible de charger les pages");
        history.replace("/sheets");
    }
}

useEffect(() => {
    if(id !== "new"){
        setEditing(true);
        fetchSheet(id)
        try {
            const data = fetchSheet(id);
        } catch (error) {

        }
    } 
}, [id]);

const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setSheet({...sheet, [name]: value})
}

const handleSubmit = async event => {
    event.preventDefault();
    try{
        if(editing){
            await sheetsAPI.update(id, sheet);
            toast.success("La page a bien été modifiée");
        } else {
            await sheetsAPI.create(sheet);
            toast.success("La page a bien été enregistrée");
            history.replace("/sheets")
        }
        
        setErrors({});
    } catch({ response }){
        const {violations} = response.data;
        if(violations){
            const apiErrors = {};
            violations.forEach(({propertyPath, message}) => {
                apiErrors[propertyPath] = message;
            });
        setErrors(apiErrors);
        toast.error("Des erreurs dans votre formulaire");
        }
    }
}

    return ( 
    <>
        {(!editing && <h1 className="mb-4">Création d'une page</h1>) || (<h1 className="mb-4">Modification d'une page</h1>) }
        <form onSubmit={handleSubmit}>
            <Field name="subject" label="Sujet" placeholder="Sujet de la page" onChange={handleChange} value={sheet.subject} error={errors.subject}/>
            <Field name="content" label="Contenu" placeholder="Contenu de la page" onChange={handleChange} value={sheet.content} error={errors.content}/>
            <div className="form-group">
                <button type="submit" className="btn btn-success mt-3 mr-2">Enregistrer</button>
                <Link to="/sheets" className="btn btn-secondary mt-3">Retour</Link>
            </div>
        </form>
    </>
    );
}

export default SheetPage;