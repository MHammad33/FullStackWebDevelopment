import { useEffect, useState } from "react";
import Phonebook from "./components/Phonebook";
import Notification from "./components/Notification";
import AddPerson from "./features/AddPerson";
import SearchPerson from "./features/SearchPerson";
import PersonService from "./services/PersonService";

function App() {
	const [newName, setNewName] = useState("");
	const [newNum, setNewNum] = useState("");
	const [persons, setPersons] = useState([]);

	const hook = () => {
		PersonService.getAll().then((response) => {
			setPersons(response.data);
			setSearchedPersons(response.data);
		});
	};
	useEffect(hook, []);

	const [result, setResult] = useState("");
	const [searchedPersons, setSearchedPersons] = useState([]);

	const addPerson = (e) => {
		e.preventDefault();

		if (!newName || !newNum) {
			setResult(" * Name or number is missing");
			setTimeout(() => setResult(""), 3000);
			return;
		}

		const isDuplicate = persons.find((p) => p.name === newName);

		if (isDuplicate && isDuplicate.number !== newNum) {
			const confirmReplace = window.confirm(
				`${newName} is already added to the Phonebook, replace the old number with a new one?`
			);

			if (confirmReplace) {
				try {
					const updatedPerson = { ...isDuplicate, number: newNum };

					PersonService.update(isDuplicate.id, updatedPerson).then(
						(response) => {
							const updatedPersons = persons.map((p) =>
								p.id !== isDuplicate.id ? p : response.data
							);
							setPersons(updatedPersons);
							setSearchedPersons(updatedPersons);
							setResult(` * Updated ${newName}'s number`);
							setTimeout(() => setResult(""), 3000);
						}
					);
				} catch (error) {
					// Handle error if update fails
					console.error("Failed to update person:", error);
				}
			}
		} else if (isDuplicate) {
			setResult(` ${newName} is already added to the Phonebook`);
			setTimeout(() => setResult(""), 3000);
		} else {
			try {
				const newPerson = {
					name: newName,
					number: newNum,
				};

				PersonService.create(newPerson).then((response) => {
					const updatedPersons = persons.concat(response.data);
					setPersons(updatedPersons);
					setSearchedPersons(updatedPersons);
					setResult(` * Added ${newName} to the phonebook`);
					setTimeout(() => setResult(""), 1000);
				});
			} catch (error) {
				console.error("Failed to create person:", error);
			}
		}

		// Reset form fields
		setNewName("");
		setNewNum("");
	};

	const deletePerson = (id) => {
		const person = persons.find((p) => p.id === id);

		if (window.confirm(`Delete ${person.name} ?`)) {
			PersonService.deletePerson(id).then((response) => {
				const newPersonsList = persons.filter((p) => p.id !== id);
				setPersons(newPersonsList);
				setSearchedPersons(newPersonsList);
				setResult(` * Deleted ${person.name} from the phonebook`);
				setTimeout(() => setResult(""), 3000);
			});
		}
	};

	const handleName = (e) => {
		setNewName(e.target.value);
	};

	const handleNum = (e) => {
		setNewNum(e.target.value);
	};

	const handleSearch = (searchValue) => {
		const newPersons = persons.filter((p) => {
			if (p.name.toLowerCase().includes(searchValue.toLowerCase())) {
				return p;
			}
		});

		if (searchValue === "") {
			setSearchedPersons(persons);
		}
		setSearchedPersons(newPersons);
	};

	const data = {
		newName,
		newNum,
		addPerson,
		result,
		handleName,
		handleNum,
	};

	return (
		<div>
			<h1>Phonebook</h1>
			{result && <Notification message={result} />}
			<SearchPerson persons={persons} handleSearch={handleSearch} />
			<AddPerson data={data} />
			<Phonebook persons={searchedPersons} onDelete={deletePerson} />
		</div>
	);
}

export default App;
