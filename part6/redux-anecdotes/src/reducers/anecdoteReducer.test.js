import anecdoteReducer, { initialState } from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

const initialStateOfAnecdote = initialState;

describe('anecdoteReducer', () => {
  test("Vote is incremented for correct antecdote", () => {
    const state = initialStateOfAnecdote;
    const targetId = state[0].id;
    const action = { type: "VOTE", payload: { id: targetId } };

    deepFreeze(state);
    const newState = anecdoteReducer(initialStateOfAnecdote, action);
    expect(newState).toContainEqual(
      ...state[0],
      votes: state[0].votes + 1,
    )
  });
})