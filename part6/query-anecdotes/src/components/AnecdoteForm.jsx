import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { createNewAnecdote } from "../requests";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const notificationDispatch = useNotificationDispatch();

	const newAnecdoteMutation = useMutation({
		mutationFn: createNewAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"]);
			queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
			notificationDispatch({ type: "ADD_ANECDOTE", payload: newAnecdote });
		},
		onError: (error) => {
			const errorMessage =
				error?.response?.data?.error || "Something went wrong!";
			notificationDispatch({
				type: "ERROR",
				payload: errorMessage,
			});
			console.error(errorMessage);
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		console.log("new anecdote");
		newAnecdoteMutation.mutate(content);
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
