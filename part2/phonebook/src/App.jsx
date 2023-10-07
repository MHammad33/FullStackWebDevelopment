import { useEffect, useState } from "react";
import "./App.css";
import Phonebook from "./components/Phonebook";
import AddPerson from "./features/AddPerson";
import SearchPerson from "./features/SearchPerson";
import axios from "axios";
import PersonService from "./services/PersonService";

function App() {
	const [newName, setNewName] = useState("");
	const [newNum, setNewNum] = useState("");
	const [persons, setPersons] = useState([]);

	const hook = () => {
		PersonService.getAll().then((initialData) => {
			setPersons(initialData);
			setSearchedPersons(initialData);
		});
	};
	useEffect(hook, []);

	const [result, setResult] = useState("");
	const [searchedPersons, setSearchedPersons] = useState([]);

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
			number: newNum,
		};

		PersonService.create(newPerson).then((newData) => {
			setPersons(persons.concat(newData));
			setSearchedPersons(persons.concat(newData));
		});

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
