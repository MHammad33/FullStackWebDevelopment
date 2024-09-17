import React, { useState, useEffect } from "react";
import { useField, useCountry } from "./hooks";
import Country from "./components/Country";

const App = () => {
	const nameInput = useField("text");
	const [name, setName] = useState("");
	const country = useCountry(name);

	const fetch = async (e) => {
		e.preventDefault();
		setName(nameInput.value);
	};

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country.countryValue} />
		</div>
	);
};

export default App;
