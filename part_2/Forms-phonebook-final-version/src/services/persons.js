    import axios from "axios"

    const baseURL = "http://localhost:3001/persons"


    const getAll = () => {
        return axios.get(baseURL)
    }

    const create = (newPerson) => {
        return axios.post(baseURL, newPerson)
    }

    const update = (updatedPerson) => {
        return axios.put(`${baseURL}/${updatedPerson.id}`, updatedPerson)
    }

    const deletePerson = (id) => {
        return axios.delete(`${baseURL}/${id}`);
    }


    export {
        getAll,
        create,
        update,
        deletePerson
    }