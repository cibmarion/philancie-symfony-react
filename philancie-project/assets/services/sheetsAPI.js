import axios from 'axios';

function findAll(){
    return axios
        .get("http://localhost:8000/api/sheets")
        .then(response => response.data['hydra:member'])
}

function find(id){
    return axios
    .get("http://localhost:8000/api/sheets/" +id)
    .then(response => response.data);
}

function deleteSheets(id){
    return axios
    .delete("http://localhost:8000/api/sheets/" + id);
}

function update(id, sheet){
    return axios.put("http://localhost:8000/api/sheets/" + id, sheet);
}

function create(sheet){
    return axios.post("http://localhost:8000/api/sheets", sheet);
}

export default {
    findAll,
    find,
    update,
    create,
    delete: deleteSheets
};