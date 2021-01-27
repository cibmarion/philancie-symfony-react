import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import SheetsAPI from '../services/sheetsAPI';
import { toast } from 'react-toastify';

const SheetsPage = props => {

    const [sheets , setSheets] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [search , setSearch] = useState("");

    const fetchSheets = async () => {
        try{
            const data = await SheetsAPI.findAll()
            setSheets(data);
        } catch(error){
            toast.error("Erreur lors du changement des pages");
        }
    }

    useEffect(() => {
        fetchSheets()
    }, []);

    const handleDelete = async id => {

        const originalSheets = [...sheets];
        setSheets(sheets.filter(sheet => sheet.id !== id))

        try{
            await SheetsAPI.delete(id)
            toast.success("La page a bien été supprimée");
        } catch(error){
            toast.error("Une erreur est survenue");
            setSheets(originalSheets);
        }
    }

    const handlePageChange = page => setCurrentPage(page);

    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const itemsPerPage = 5;

    const filteredSheets = sheets.filter(
        s => 
        s.subject.toLowerCase().includes(search.toLowerCase()) || 
        s.content.toLowerCase().includes(search.toLowerCase)
    );

    const paginatedSheets = Pagination.getData(filteredSheets, currentPage, itemsPerPage);

    return(
    <>
        <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-4">Liste des pages</h1>
            <Link to="/sheets/new" className="mb-3 btn btn-primary">Créer une page</Link>
        </div>
        
        <div>
            <input type="text" onChange={handleSearch} value={search} className="form-control mb-4" placeholder="Rechercher..."/>
        </div>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>
                        <h4>Sujet</h4>
                    </th>
                    <th>
                        <h4>Description</h4>
                    </th>
                </tr>
            </thead>
            <tbody>
                {paginatedSheets.map(sheet => (
                <tr key={sheet.id}>
                    <td>{sheet.subject}</td>
                    <td>{sheet.content}</td>
                    <td>
                        <Link to={"/sheets/" + sheet.id} className="btn btn-sm btn-primary mr-1">
                            Editer
                        </Link>
                    </td>
                    <td><button onClick={()=> handleDelete(sheet.id)} type="button" className="btn-sm btn
                            btn-danger">Supprimer</button></td>
                </tr>
                ))}
            </tbody>
        </table>
        
        {itemsPerPage < filteredSheets.length && (<Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredSheets.length} onPageChanged={handlePageChange}/> )}
    </>
    );
};

export default SheetsPage;