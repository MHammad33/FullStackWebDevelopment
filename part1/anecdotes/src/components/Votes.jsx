const Votes = ({ votes, selected, handleVotes }) => {
	return (
		<>
			<button onClick={handleVotes}>vote</button>
			<p>{votes[selected]} votes</p>
		</>
	);
};
export default Votes;
