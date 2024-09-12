import anecdoteSlice from "./anecdoteSlice";
import deepFreeze from "deep-freeze";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const initialState = anecdotesAtStart.map(asObject)


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