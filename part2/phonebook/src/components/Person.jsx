const Person = (props) => {
	const { name, num, onDelete } = props;

	return (
		<>
			<li>
				{name}: {num}
				<button onClick={onDelete}>Delete</button>
			</li>
		</>
	);
};
export default Person;
