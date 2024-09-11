import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => {
		const { anecdotes, filter } = state;
		if (!filter) return anecdotes;

		const filterInLowerCase = filter.toLowerCase();
		const filteredAnecdotes = anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(filterInLowerCase)
		);

		return filteredAnecdotes;
	});

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
