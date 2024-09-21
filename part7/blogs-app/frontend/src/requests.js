import axios from "axios";
const baseUrl = "/api/blogs";

export const fetchAllBlogs = async () => {
  const response = await axios.get(baseUrl, { headers: { Authorization: token } });
  return response.data;
};
