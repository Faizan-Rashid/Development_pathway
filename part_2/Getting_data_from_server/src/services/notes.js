import axios from "axios";

const baseURL = `http://localhost:3000/api/notes`;

const getAll = () => {
    return axios.get(baseURL).then(res => res.data);
}

const create = (newNote) => {

    return axios.post(baseURL, newNote).then(res => res.data)
}

const update = (updatedNote) => {
    return axios.put(`${baseURL}/${updatedNote.id}`, updatedNote).then(res => res.data)
}

export {
    getAll,
    create,
    update
}