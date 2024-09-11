import anecdoteSlice, { initialState } from "./anecdoteSlice";
import deepFreeze from "deep-freeze";

const initialStateOfAnecdote = initialState;

describe('anecdoteSlice', () => {
  test("Vote is incremented for correct antecdote", () => {
    const state = initialStateOfAnecdote;
    const targetId = state[0].id;
    deepFreeze(state);

    const action = { type: "anecdotes/addVote", payload: targetId };
    const newState = anecdoteSlice(initialStateOfAnecdote, action);
    expect(newState).toEqual(
      state.map(antecdote => antecdote.id === targetId ? { ...antecdote, votes: antecdote.votes + 1 } : antecdote)
    )
  });

  test("a new antecdote can be added", () => {
    const state = initialStateOfAnecdote;
    deepFreeze(state);

    const action = { type: "anecdotes/createAnecdote", payload: "A New Anecdote" };
    const newState = anecdoteSlice(initialStateOfAnecdote, action);
    const addedAnecdote = newState.find(anecdote => anecdote.content === "A New Anecdote");
    expect(newState).toEqual([...state, addedAnecdote]);
    expect(newState.length).toBe(state.length + 1);
  });
})