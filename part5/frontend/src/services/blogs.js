import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl, {
    headers: { Authorization: token }
  });
  return request.then(response => response.data);
}

export default { getAll, setToken }