import { createAnecdote } from "../slices/anecdoteSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "../slices/notificationSlice";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = async (event) => {
		event.preventDefault();
		const anecdoteToCreate = event.target.anecdote.value;
		event.target.anecdote.value = "";

		dispatch(createAnecdote(anecdoteToCreate));
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
