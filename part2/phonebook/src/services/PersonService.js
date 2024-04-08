import axios from "axios";
const baseUrl = "/api/personsData";

const getAll = () => {
    return axios.get(baseUrl);
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson);
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, create, deletePerson };