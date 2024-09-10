import anecdoteReducer, { asObject, initialState } from "./anecdoteReducer";
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
    const newAntecdote = asObject("A new Antecdote");
    const action = { type: "ADD_NOTE", payload: { ...newAntecdote } };
    deepFreeze(state);
    const newState = anecdoteReducer(initialStateOfAnecdote, action);
    expect(newState).toEqual([...initialState, newAntecdote])
  });
})