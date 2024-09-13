import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();

	const newAnecdoteMutation = useMutation({
		mutationFn: (newAnecdote) =>
			axios
				.post("http://localhost:3001/anecdotes", newAnecdote)
				.then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
		},
		onError: (error) => {
			console.error("Error creating anecdote:", error.message);
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		console.log("new anecdote");
		const newAnecdote = {
			content,
			id: Date.now(),
			votes: 0,
		};

		console.log("newAnecdote", newAnecdote);
		newAnecdoteMutation.mutate(newAnecdote);
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
