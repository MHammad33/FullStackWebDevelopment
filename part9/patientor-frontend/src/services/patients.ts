import axios from "axios";
import { EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

	return data;
};

const getById = async (patientId: string | null) => {
	const { data } = await axios.get<Patient>(
		`${apiBaseUrl}/patients/${patientId}`
	);

	return data;
};

const addEntry = async (patientId: string, newEntry: EntryWithoutId) => {
	const { data } = await axios.post<Patient>(
		`${apiBaseUrl}/patients/${patientId}/entries`,
		newEntry
	);

	return data;
};

export default {
	getAll,
	create,
	getById,
	addEntry,
};
