import { FC, useState } from "react";
import { DiaryEntry } from "../types";

interface NewDiaryEntryFormProps {
	onDiarySubmit: (addedDiary: DiaryEntry) => void;
}

const NewDiaryEntryForm: FC<NewDiaryEntryFormProps> = ({ onDiarySubmit }) => {
	const [date, setDate] = useState("");
	const [visibility, setVisibility] = useState("");
	const [weather, setWeather] = useState("");
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
		setVisibility("");
		setWeather("");
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
				/>
			</div>
			<div>
				<label>Visibility:</label>
				<input
					value={visibility}
					onChange={(e) => setVisibility(e.target.value)}
				/>
			</div>
			<div>
				<label>Weather:</label>
				<input value={weather} onChange={(e) => setWeather(e.target.value)} />
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
