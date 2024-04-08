const PopularAntecdote = ({ antecdotes, maxVotesIndex }) => {
	return (
		<div>
			<h2>Antecdote with most votes</h2>
			<p>{antecdotes[maxVotesIndex]}</p>
		</div>
	);
};
export default PopularAntecdote;
