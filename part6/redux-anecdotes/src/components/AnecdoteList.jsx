import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

	const dispatch = useDispatch();

	const vote = (id) => {
		console.log("vote", id);
		dispatch(addVote(id));
	};

	return (
		<>
			{sortedAnecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleVoteClick={() => vote(anecdote.id)}
				/>
			))}
		</>
	);
};
export default AnecdoteList;
