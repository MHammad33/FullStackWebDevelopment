import CountryWeather from "./CountryWeather";

const Country = ({ country }) => {
	return (
		<div className="country">
			<div className="upper-half">
				<div>
					<h1>{country.name.common}</h1>
					<p>Capital: {country.capital[0]}</p>
					<p>Area: {country.area}</p>
				</div>
				<div>
					<img src={country.flags.png} alt={country.flags.alt} />
				</div>
			</div>

			<h3>Languages</h3>
			<ul>
				{Object.values(country.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>

			<CountryWeather capital={country.capital[0]} />
		</div>
	);
};
export default Country;
