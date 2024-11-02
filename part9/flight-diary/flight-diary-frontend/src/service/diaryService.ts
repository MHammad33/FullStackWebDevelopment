import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
	return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const createNewDiaryEntry = async (diaryEntry: NewDiaryEntry) => {
	return axios
		.post<DiaryEntry>(baseUrl, diaryEntry)
		.then((response) => response.data);
};
