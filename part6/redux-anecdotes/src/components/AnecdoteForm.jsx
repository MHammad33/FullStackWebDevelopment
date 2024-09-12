import { createAnecdote } from "../slices/anecdoteSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "../slices/notificationSlice";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = async (event) => {
		event.preventDefault();
		const anecdoteToCreate = event.target.anecdote.value;
		event.target.anecdote.value = "";

		const newAnecdote = await anecdoteService.create(anecdoteToCreate);
		console.log("newAnecdote", newAnecdote);
		dispatch(createAnecdote(newAnecdote));
		dispatch(showNotification(`Added Anecdote "${anecdoteToCreate}"`));
	};

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</>
	);
};
export default AnecdoteForm;
