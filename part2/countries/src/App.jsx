import Search from "./components/Search";
import Countries from "./components/Countries";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
	const [countries, setCountries] = useState([]);
	const [countriesToShow, setCountriesToShow] = useState([]);

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => {
				setCountries(response.data);
				console.log("Done!");
			})
			.catch((error) => {
				console.log("Error: ", error);
			});
	}, []);

	const handleSearch = (searchValue) => {
		// If search value is empty, don't show any countries
		if (searchValue === "") {
			setCountriesToShow([]);
			return;
		}

		// Filter countries based on search value
		const filteredCountries = countries.filter((country) =>
			country.name.common.toLowerCase().includes(searchValue.toLowerCase())
		);

		// If there are less than 10 countries, show them
		setCountriesToShow(filteredCountries);
	};

	return (
		<div className="container">
			<h1>Countries</h1>
			<hr />
			<Search onSearch={handleSearch} onChange={handleSearch} />
			<Countries countries={countriesToShow} />
		</div>
	);
}

export default App;
