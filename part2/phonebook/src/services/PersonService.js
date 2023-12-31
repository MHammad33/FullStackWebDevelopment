import axios from "axios";
const baseUrl = "http://localhost:3000/personsData";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson);
    return request.then(res => res.data);
}

export default { getAll, create };