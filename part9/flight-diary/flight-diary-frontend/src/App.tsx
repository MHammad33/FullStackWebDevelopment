import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaries } from "./service/diaryService";

function App() {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getAllDiaries().then((data) => {
			setDiaries(data);
		});
	}, []);

	return (
		<>
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
