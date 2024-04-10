import { useState } from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
	const [countryToShow, setCountryToShow] = useState(null);
	const showCountry = (cca2) => {
		const country = countries.find((country) => country.cca2 === cca2);
		setCountryToShow(country);
	};

	if (countries.length === 0) {
		return <p>Enter valid search query.</p>;
	}

	if (countries.length == 1) {
		const country = countries[0];
		return <Country country={country} />;
	}

	return (
		<div>
			<ul>
				{countries.length <= 10 ? (
					countries.map((country) => (
						<li key={country.cca2}>
							{country.name.common}
							<button onClick={() => showCountry(country.cca2)}>Show</button>
						</li>
					))
				) : (
					<h3>Too many matches, specify another filter</h3>
				)}
			</ul>
			{countryToShow && <Country country={countryToShow} />}
		</div>
	);
};
export default Countries;
