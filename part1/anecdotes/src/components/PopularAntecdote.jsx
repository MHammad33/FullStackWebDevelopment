const PopularAntecdote = (props) => {
	return (
		<div>
			<h2>Antecdote with most votes</h2>
			<p>{props.antecdotes[props.max]}</p>
		</div>
	);
};
export default PopularAntecdote;
