import Person from "./Person";

const Phonebook = ({ persons, onDelete }) => {
	return (
		<>
			<h2>Numbers</h2>
			<div>
				<ul>
					{persons.map((person) => (
						<Person
							key={person.id}
							name={person.name}
							num={person.number}
							onDelete={() => onDelete(person.id)}
						/>
					))}
				</ul>
			</div>
		</>
	);
};
export default Phonebook;
