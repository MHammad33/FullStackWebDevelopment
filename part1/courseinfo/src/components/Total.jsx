const Total = (props) => {
	return (
		<p>
			Number of exercises{" "}
			{props.parts.reduce((total, curr) => total + curr.exercises, 0)}
		</p>
	);
};
export default Total;
