import axios from "axios";
const baseUrl = "/api/users";

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
