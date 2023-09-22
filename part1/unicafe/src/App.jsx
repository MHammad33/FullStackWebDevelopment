import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";
import "./App.css";

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const total = good + neutral + bad;

	return (
		<div>
			<h2>Give feedback</h2>
			<Button handleClick={() => setGood(good + 1)} text={"good"} />
			<Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
			<Button handleClick={() => setBad(bad + 1)} text={"bad"} />

			<Statistics good={good} bad={bad} neutral={neutral} total={total} />
		</div>
	);
}

export default App;
