const Antecdote = (props) => {
	return (
		<div>
			<h2>Antecdotes</h2>
			<p>{props.antecdotes[props.selected]}</p>
			<button onClick={props.handleAntecdote}>next anectdote</button>
		</div>
	);
};
export default Antecdote;
