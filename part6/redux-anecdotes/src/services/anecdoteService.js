import axios from "axios";

const baseUrl = "/api/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (anecdote) => {
  const newAnecdote = { anecdote, id: Date.now(), votes: 0 };
  const response = await axios.get(baseUrl, newAnecdote);
  return response.data;
}

export default { getAll, create };