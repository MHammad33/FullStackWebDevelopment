import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";
import "./App.css";
import Feedbacks from "./components/Feedbacks";

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const total = good + neutral + bad;

	const handleFeedback = (feedback) => {
		switch (feedback) {
			case 1:
				setGood(good + 1);
				break;
			case 2:
				setNeutral(neutral + 1);
				break;
			case 3:
				setBad(bad + 1);
				break;
			default:
				console.log("Something wrong");
		}
	};

	return (
		<div>
			<Feedbacks onFeedback={handleFeedback} />

			<Statistics good={good} bad={bad} neutral={neutral} total={total} />
		</div>
	);
}

export default App;
