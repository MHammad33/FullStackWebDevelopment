import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: () =>
			axios.get("http://localhost:3001/anecdotes").then((res) => res.data),
		retry: 1,
	});

	// const handleVote = (anecdote) => {
	// 	console.log("vote");
	// };

	// const anecdotes = [
	// 	{
	// 		content: "If it hurts, do it more often",
	// 		id: "47145",
	// 		votes: 0,
	// 	},
	// ];

	if (result.isLoading) {
		return <h3>Loading...</h3>;
	}

	const anecdotes = result.data;

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