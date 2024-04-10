import axios from "axios";
import { useEffect, useState } from "react";

const CountryWeather = ({ capital }) => {
	const [weatherData, setWeatherData] = useState(null);

	const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
	const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${API_KEY}`;

	useEffect(() => {
		console.log("Weather fetching...");

		const fetchData = async () => {
			try {
				const res = await axios.get(weatherAPI);
				// console.log(res.data);
				setWeatherData(res.data);
			} catch (error) {
				console.log("Error: ", error);
			}
		};

		fetchData();
	}, []);

	return weatherData ? (
		<>
			<h3>Weather in {capital}</h3>
			<div className="weather-container">
				<div>
					<p>Temperature: {weatherData?.main.temp}°C</p>
				</div>
				<div className="image-container">
					<img
						src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
						alt="weather-icon"
					/>
				</div>
				<p>Wind: {(weatherData?.wind.speed * 3.6).toFixed(2)} km/h</p>
			</div>
		</>
	) : (
		<p>Loading Weather Data...</p>
	);
};
export default CountryWeather;
