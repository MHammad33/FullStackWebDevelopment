import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

export const createNewAnecdote = async (anecdoteContent) => {
  const newAnecdote = {
    content: anecdoteContent,
    id: Date.now(),
    votes: 0
  };

  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
}