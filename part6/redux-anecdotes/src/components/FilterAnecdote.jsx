const FilterAnecdote = () => {
	const handleChange = (event) => {
		const filter = event.target.value;
		console.log("filter", filter);
	};
	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	);
};
export default FilterAnecdote;
