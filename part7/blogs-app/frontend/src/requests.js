import axios from "axios";
const baseUrl = "/api/blogs";

export const fetchAllBlogs = async () => {
  const user = window.localStorage.getItem("loggedUser");
  const { token } = JSON.parse(user);
  const response = await axios.get(baseUrl, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const createNewBlog = async newBlog => {
  const user = window.localStorage.getItem("loggedUser");
  const { token } = JSON.parse(user);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};
