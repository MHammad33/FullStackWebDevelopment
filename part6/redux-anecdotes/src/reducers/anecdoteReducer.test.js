import anecdoteReducer, { initialState } from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

const initialStateOfAnecdote = initialState;

describe('anecdoteReducer', () => {
  test("Vote is incremented for correct antecdote", () => {
    const state = initialStateOfAnecdote;
    const targetId = state[0].id;
    const action = { type: "ADD_VOTE", payload: { id: targetId } };

    deepFreeze(state);
    const newState = anecdoteReducer(initialStateOfAnecdote, action);
    expect(newState).toEqual(
      state.map(antecdote => antecdote.id === targetId ? { ...antecdote, votes: antecdote.votes + 1 } : antecdote)
    )
  });

  test("a new antecdote can be added", () => {
    const state = initialStateOfAnecdote;
    const action = { type: "ADD_ANECDOTE", payload: { anecdote: "A New Anecdote" } };
    deepFreeze(state);

    const newState = anecdoteReducer(initialStateOfAnecdote, action);
    const addedAnecdote = newState.find(anecdote => anecdote.content === "A New Anecdote");

    expect(newState).toEqual([...state, addedAnecdote]);
    expect(newState.length).toBe(state.length + 1);
  });
})