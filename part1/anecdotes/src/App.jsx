import { useState } from "react";
import "./App.css";
import { antecdotes } from "./data/antecdotes";
import Antecdote from "./components/Antecdote";
import PopularAntecdote from "./components/PopularAntecdote";
import Votes from "./components/Votes";

function App() {
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(Array(antecdotes.length).fill(0));
	const max = votes.reduce((a, b) => Math.max(a, b));
	console.log(votes);

	const handleAntecdote = () => {
		let rand;
		while (true) {
			rand = Math.floor(Math.random() * antecdotes.length);
			if (rand !== selected) break;
		}
		setSelected(rand);
	};

	const handleVotes = () => {
		let copy = [...votes];
		copy[selected]++;
		setVotes(copy);
	};

	return (
		<div>
			<Antecdote
				antecdotes={antecdotes}
				selected={selected}
				handleAntecdote={handleAntecdote}
			/>
			<Votes votes={votes} selected={selected} handleVotes={handleVotes} />
			<PopularAntecdote antecdotes={antecdotes} max={max} votes={votes} />
		</div>
	);
}

export default App;
