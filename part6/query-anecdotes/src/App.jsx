import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAllAnecdotes, updateAnecdote } from "./requests";

const App = () => {
	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAllAnecdotes,
		retry: 1,
	});

	const handleVote = async (anecdote) => {
		console.log("vote");
		const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
		await updateAnecdote(updatedAnecdote);
	};

	if (result.isLoading) {
		return <h3>Loading...</h3>;
	}

	const anecdotes = result.data;

	if (!Array.isArray(anecdotes)) {
		return <div>No anecdotes available.</div>;
	}

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
