import axios from "axios";

const baseUrl = "/api/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (anecdote) => {
  const newAnecdote = { content: anecdote, id: Date.now(), votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
}

const update = async (anecdoteToUpdate) => {
  console.log('anecdoteToUpdate', anecdoteToUpdate)
  const response = await axios.put(`${baseUrl}/${anecdoteToUpdate.id}`, anecdoteToUpdate);
  return response.data;
}

export default { getAll, create, update };