const Person = (props) => {
	const { name, num, onDelete } = props;

	return (
		<div className="person">
			<li>
				<span>{name}</span>: {num}
			</li>
			<button onClick={onDelete}>Delete</button>
		</div>
	);
};
export default Person;
