import { useState } from "react";
import "./App.css";
import Person from "./components/Person";
import Phonebook from "./components/Phonebook";
import AddPerson from "./features/AddPerson";
import SearchPerson from "./features/SearchPerson";

function App(props) {
	const [newName, setNewName] = useState("");
	const [newNum, setNewNum] = useState("");
	const [persons, setPersons] = useState([
		{ name: "Hammad", num: "0332-8378289" },
		{ name: "Ali", num: "0332-8378289" },
		{ name: "Asad", num: "0332-8378289" },
		{ name: "Hannan", num: "0332-8378289" },
	]);
	const [result, setResult] = useState("");
	const [searchedPersons, setSearchedPersons] = useState([]);
	console.log("searchedPersons", searchedPersons);

	const addPerson = (e) => {
		e.preventDefault();
		const isDuplicate = persons.find((p) => p.name === newName);

		if (isDuplicate) {
			setResult(` ${newName} is already added to the Phonebook`);
			setTimeout(() => setResult(""), 3000);
			setNewName("");
			return;
		}

		const newPerson = {
			name: newName,
			num: newNum,
		};
		setPersons(persons.concat(newPerson));

		setNewName("");
		setNewNum("");
		setResult(" * Added to the phonebook");
		setTimeout(() => setResult(""), 1000);
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
			<SearchPerson persons={persons} handleSearch={handleSearch} />
			<AddPerson data={data} />
			<Phonebook persons={searchedPersons} />
		</div>
	);
}

export default App;
