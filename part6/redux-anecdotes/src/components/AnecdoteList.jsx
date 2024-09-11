import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../slices/anecdoteSlice";
import { showNotification } from "../slices/notificationSlice";
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

	const vote = (anecdote) => {
		console.log("vote", anecdote.id);
		dispatch(addVote(anecdote.id));
		dispatch(showNotification(`You voted "${anecdote.content}"`));
	};

	return (
		<>
			{sortedAnecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleVoteClick={() => vote(anecdote)}
				/>
			))}
		</>
	);
};
export default AnecdoteList;
