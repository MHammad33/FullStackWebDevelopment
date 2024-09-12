import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const anecdoteIndex = state.findIndex(anecdote => anecdote.id === id);
      if (anecdoteIndex != -1) state[anecdoteIndex].votes += 1;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  }
});

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(anecdote);
    dispatch(appendAnecdote(newAnecdote));
  }
}
export default anecdoteSlice.reducer;