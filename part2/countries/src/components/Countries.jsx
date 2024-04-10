const Countries = ({ countries }) => {
	if (countries.length === 0) {
		return <p>Enter valid search query.</p>;
	}

	if (countries.length == 1) {
		const country = countries[0];
		return (
			<div className="country">
				<h1>{country.name.common}</h1>
				<p>Capital: {country.capital[0]}</p>
				<p>Area: {country.area}</p>

				<h3>Languages</h3>
				<ul>
					{Object.values(country.languages).map((language) => (
						<li key={language}>{language}</li>
					))}
				</ul>

				<img src={country.flags.png} alt={country.flags.alt} />
			</div>
		);
	}

	return (
		<div>
			<ul>
				{countries.length <= 10 ? (
					countries.map((country) => (
						<li key={country.cca2}>{country.name.common}</li>
					))
				) : (
					<h3>Too many matches, specify another filter</h3>
				)}
			</ul>
		</div>
	);
};
export default Countries;
