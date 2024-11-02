import { FC, useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface NewDiaryEntryFormProps {
	onDiarySubmit: (addedDiary: NewDiaryEntry) => void;
}

const NewDiaryEntryForm: FC<NewDiaryEntryFormProps> = ({ onDiarySubmit }) => {
	const [date, setDate] = useState("");
	const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
	const [weather, setWeather] = useState<Weather>(Weather.Sunny);
	const [comment, setComment] = useState("");

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		onDiarySubmit({
			date,
			visibility,
			weather,
			comment,
		});

		setDate("");
		setVisibility(Visibility.Ok);
		setWeather(Weather.Sunny);
		setComment("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Date:</label>
				<input
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					required
				/>
			</div>
			<div>
				<label>Visibility:</label>
				<label>
					<input
						type="radio"
						name="visibility"
						value="ok"
						checked={visibility === "ok"}
						onChange={() => setVisibility(Visibility.Ok)}
					/>
					Ok
				</label>
				<label>
					<input
						type="radio"
						name="visibility"
						value="great"
						checked={visibility === "great"}
						onChange={() => setVisibility(Visibility.Great)}
					/>
					Great
				</label>
				<label>
					<input
						type="radio"
						name="visibility"
						value="good"
						checked={visibility === "good"}
						onChange={() => setVisibility(Visibility.Good)}
					/>
					Good
				</label>
				<label>
					<input
						type="radio"
						name="visibility"
						value="poor"
						checked={visibility === "poor"}
						onChange={() => setVisibility(Visibility.Poor)}
					/>
					Poor
				</label>
			</div>

			<div>
				<label>Weather:</label>
				<label>
					<input
						type="radio"
						name="weather"
						value="sunny"
						checked={weather === "sunny"}
						onChange={() => setWeather(Weather.Sunny)}
					/>
					Sunny
				</label>
				<label>
					<input
						type="radio"
						name="weather"
						value="rainy"
						checked={weather === "rainy"}
						onChange={() => setWeather(Weather.Rainy)}
					/>
					Rainy
				</label>
				<label>
					<input
						type="radio"
						name="weather"
						value="cloudy"
						checked={weather === "cloudy"}
						onChange={() => setWeather(Weather.Cloudy)}
					/>
					Cloudy
				</label>
				<label>
					<input
						type="radio"
						name="weather"
						value="stormy"
						checked={weather === "stormy"}
						onChange={() => setWeather(Weather.Stormy)}
					/>
					Stormy
				</label>
				<label>
					<input
						type="radio"
						name="weather"
						value="windy"
						checked={weather === "windy"}
						onChange={() => setWeather(Weather.Windy)}
					/>
					Windy
				</label>
			</div>

			<div>
				<label>Comment:</label>
				<input value={comment} onChange={(e) => setComment(e.target.value)} />
			</div>
			<button type="submit">Add Entry</button>
		</form>
	);
};

export default NewDiaryEntryForm;
