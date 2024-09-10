const Anecdote = ({ anecdote, handleVoteClick }) => {
	return (
		<div key={anecdote.id}>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleVoteClick}>vote</button>
			</div>
		</div>
	);
};
export default Anecdote;
