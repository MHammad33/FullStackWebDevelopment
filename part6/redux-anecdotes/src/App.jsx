import { useDispatch } from "react-redux";
import anecdoteService from "./services/anecdoteService";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdote from "./components/FilterAnecdote";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { setAnecdotes } from "./slices/anecdoteSlice";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		anecdoteService.getAll().then((anecdotes) => {
			dispatch(setAnecdotes(anecdotes));
		});
	}, []);

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<FilterAnecdote />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
