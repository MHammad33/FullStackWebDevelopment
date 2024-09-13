import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAllAnecdotes, updateAnecdote } from "./requests";

const App = () => {
	const queryClient = useQueryClient();

	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAllAnecdotes,
		retry: 1,
	});

	const updateAnecdoteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: (updatedAnecdote) => {
			const previousAnecdotes = queryClient.getQueryData(["anecdotes"]);
			const anecdotesAfterUpdate = previousAnecdotes.map((anecdote) =>
				anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
			);

			queryClient.setQueryData(["anecdotes"], anecdotesAfterUpdate);
		},
	});

	const handleVote = (anecdote) => {
		console.log("vote");
		const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
		updateAnecdoteMutation.mutate(updatedAnecdote);
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
