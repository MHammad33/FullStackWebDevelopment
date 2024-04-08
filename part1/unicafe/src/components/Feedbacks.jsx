import Button from "./Button";

const Feedbacks = ({ onFeedback }) => {
	const FEEDBACKS = {
		good: 1,
		neutral: 2,
		bad: 3,
	};

	const { good, neutral, bad } = FEEDBACKS;

	// console.log(good, bad, neutral);

	return (
		<div>
			<h2>Give feedback</h2>
			<Button onClick={() => onFeedback(good)} text={"good"} />
			<Button onClick={() => onFeedback(neutral)} text={"neutral"} />
			<Button onClick={() => onFeedback(bad)} text={"bad"} />
		</div>
	);
};
export default Feedbacks;
