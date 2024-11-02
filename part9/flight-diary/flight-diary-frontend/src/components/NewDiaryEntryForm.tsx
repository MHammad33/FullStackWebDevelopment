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
				{Object.values(Visibility).map((option) => (
					<label key={option}>
						<input
							type="radio"
							name="visibility"
							value={option}
							checked={visibility === option}
							onChange={() => setVisibility(option)}
						/>
						{option}
					</label>
				))}
			</div>

			<div>
				<label>Weather:</label>
				{Object.values(Weather).map((option) => (
					<label key={option}>
						<input
							type="radio"
							name="weather"
							value={option}
							checked={weather === option}
							onChange={() => setWeather(option)}
						/>
						{option}
					</label>
				))}
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
