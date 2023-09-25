import Button from "./Button";

const Feedbacks = (props) => {
	const { handleFeedback } = props;
	const FEEDBACKS = {
		good: 1,
		neutral: 2,
		bad: 3,
	};

	const { good, neutral, bad } = FEEDBACKS;

	console.log(good, bad, neutral);

	return (
		<div>
			<h2>Give feedback</h2>
			<Button handleClick={() => handleFeedback(good)} text={"good"} />
			<Button handleClick={() => handleFeedback(neutral)} text={"neutral"} />
			<Button handleClick={() => handleFeedback(bad)} text={"bad"} />
		</div>
	);
};
export default Feedbacks;
