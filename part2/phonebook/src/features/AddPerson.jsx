const AddPerson = (props) => {
	const { newName, newNum, addPerson, result, handleName, handleNum } =
		props.data;

	return (
		<div className="add-contact">
			<h2>Add Contact</h2>
			<form onSubmit={addPerson}>
				<div>
					Name: <input value={newName} onChange={handleName} />
				</div>
				<div>
					Number: <input value={newNum} onChange={handleNum} />
				</div>
				<div>
					<button type="submit">Add</button>
				</div>
			</form>
		</div>
	);
};
export default AddPerson;
