import axios from "axios";
const baseUrl = "/api/blogs";

export const fetchAllBlogs = async () => {
  const user = window.localStorage.getItem("loggedUser");
  const { token } = JSON.parse(user);
  const response = await axios.get(baseUrl, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
