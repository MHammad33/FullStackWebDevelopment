import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
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
    }
  }
});

export const { addVote, createAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;