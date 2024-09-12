import { createSlice } from "@reduxjs/toolkit";

export const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const anecdoteIndex = state.findIndex(anecdote => anecdote.id === id);
      if (anecdoteIndex != -1) state[anecdoteIndex].votes += 1;
    },
    createAnecdote(state, action) {
      const anecdoteContent = action.payload;
      const anecdoteToAdd = asObject(anecdoteContent);
      state.push(anecdoteToAdd);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const { addVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;