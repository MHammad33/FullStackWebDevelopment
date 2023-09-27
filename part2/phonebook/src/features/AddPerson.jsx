const AddPerson = (props) => {
	const { newName, newNum, addPerson, result, handleName, handleNum } =
		props.data;

	return (
		<>
			<h2>Add Contact</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleName} />
				</div>
				<div>
					number: <input value={newNum} onChange={handleNum} />
				</div>
				<div>
					<button type="submit">Add</button>
				</div>
				<div>{result}</div>
			</form>
		</>
	);
};
export default AddPerson;
