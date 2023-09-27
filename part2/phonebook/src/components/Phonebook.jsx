import Person from "./Person";

const Phonebook = ({ persons }) => {
	return (
		<>
			<h2>Numbers</h2>
			<div>
				<ul>
					{persons.map((person, i) => (
						<Person key={i} name={person.name} num={person.num} />
					))}
				</ul>
			</div>
		</>
	);
};
export default Phonebook;
