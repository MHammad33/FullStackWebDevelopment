import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useReducer } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAllAnecdotes, updateAnecdote } from "./requests";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "ADD_VOTE":
			return "Vote Added";
		case "ADD_ANECDOTE":
			return "Anecdote Added";
		default:
			return "";
	}
};

const App = () => {
	const queryClient = useQueryClient();
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		""
	);

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
		notificationDispatch({ type: "ADD_VOTE" });
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

			<Notification message={notification} />
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
