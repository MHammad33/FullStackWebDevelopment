import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl, { headers: { Authorization: token } });
  return response.data;
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  return response.data;
}

export default { getAll, setToken, create, update }