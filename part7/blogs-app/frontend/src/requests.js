import axios from "axios";
const baseUrl = "/api/blogs";

export const fetchAllBlogs = async () => {
  try {
    const user = window.localStorage.getItem("loggedUser");
    if (!user) {
      throw new Error("User is not logged in.");
    }
    const { token } = JSON.parse(user);

    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.get(baseUrl, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
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

export const updateBlogInDb = async ({ id, updatedBlog }) => {
  const user = window.localStorage.getItem("loggedUser");
  const { token } = JSON.parse(user);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  return response.data;
};

export const addBlogComment = async ({ id, updatedBlog }) => {
  const user = window.localStorage.getItem("loggedUser");
  const { token } = JSON.parse(user);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(`${baseUrl}/${id}/comments`, updatedBlog, config);
  return response.data;
};

export const removeBlog = async id => {
  const user = window.localStorage.getItem("loggedUser");
  const { token } = JSON.parse(user);
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  await axios.delete(`${baseUrl}/${id}`, config);
  return id;
};
