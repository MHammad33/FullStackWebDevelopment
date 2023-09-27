const Person = (props) => {
	const { name, num } = props;

	return (
		<li>
			{name}: {num}
		</li>
	);
};
export default Person;
