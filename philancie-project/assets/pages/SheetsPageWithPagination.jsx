import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';

const SheetsPageWithPagination = props => {

    const [sheets , setSheets] = useState([]);
    const [totalItems , setTotalItems] = useState(0);
    const [currentPage , setCurrentPage] = useState(1);
    const [loading , setLoading] = useState(true);
    const itemsPerPage = 10;

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/sheets?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
        .then(response => {
        setSheets(response.data['hydra:member']);
        setTotalItems(response.data['hydra:totalItems']);
        setLoading(false);
        })
        .catch(error=> console.log(error.response))
    }, [currentPage]);

    const handleDelete = (id) => {

        const originalSheets = [...sheets];
        setSheets(sheets.filter(sheet => sheet.id !== id))

        axios
        .delete("http://localhost:8000/api/sheets/" + id)
        .then(response => console.log("ok"))
        .catch(error => {
        setSheets(originalSheets);
            console.log(error.response);
        })
    }

    const handlePageChange = page => {
        setCurrentPage(page);
        setLoading(true);
    }

    const paginatedSheets = Pagination.getData(sheets, currentPage, itemsPerPage);

    return(
    <>
        <h1>Liste des pages (pagination)</h1>

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
                {loading && (
                    <tr>
                        <td>
                            <div className="spinner-border" role="status"></div>
                        </td>
                    </tr>  
                )}
                {!loading && sheets.map(sheet => (
                <tr key={sheet.id}>
                    <td>{sheet.subject}</td>
                    <td>{sheet.content}</td>
                    <td><button onClick={()=> handleDelete(sheet.id)} type="button" className="btn
                            btn-danger">Supprimer</button></td>
                </tr>
                ))}
            </tbody>
        </table>
        
        <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChanged={handlePageChange}/>
    </>
    );

};

export default SheetsPageWithPagination;