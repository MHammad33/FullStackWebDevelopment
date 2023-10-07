import { useEffect, useState } from "react";
import "./App.css";
import Phonebook from "./components/Phonebook";
import AddPerson from "./features/AddPerson";
import SearchPerson from "./features/SearchPerson";
import axios from "axios";

function App() {
	const [newName, setNewName] = useState("");
	const [newNum, setNewNum] = useState("");
	const [persons, setPersons] = useState([]);

	const hook = () => {
		axios.get("http://localhost:3000/personsData").then((res) => {
			setPersons(res.data);
			setSearchedPersons(res.data);
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

		axios.post("http://localhost:3000/personsData", newPerson).then((res) => {
			setPersons(persons.concat(newPerson));
			setSearchedPersons(persons.concat(newPerson));
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
