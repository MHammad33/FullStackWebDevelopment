import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { createNewDiaryEntry, getAllDiaries } from "./service/diaryService";
import NewDiaryEntryForm from "./components/NewDiaryEntryForm";
import axios from "axios";
import ErrorMessage from "./components/ErrorMessage";

function App() {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getAllDiaries()
			.then((data) => {
				setDiaries(data);
			})
			.catch((error) => {
				console.error("Failed to fetch diaries:", error);
				setError("Failed to load diary entries.");
			});
	}, []);

	const handleDiarySubmit = async (addedDiary: DiaryEntry) => {
		try {
			const savedDiary = await createNewDiaryEntry(addedDiary);
			setDiaries(diaries.concat(savedDiary));
			setError(null);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(
					error.response?.data?.message || "Failed to create diary entry."
				);
			} else {
				setError("An unexpected error occurred.");
			}
		}
	};

	return (
		<>
			<NewDiaryEntryForm onDiarySubmit={handleDiarySubmit} />
			{error && <ErrorMessage error={error} />}
			<h1>Diary Entries</h1>
			{diaries.map((diary) => (
				<div key={diary.id}>
					<h2>{diary.date}</h2>
					<p>Visibility: {diary.visibility}</p>
					<p>Weather: {diary.weather}</p>
				</div>
			))}
		</>
	);
}

export default App;
