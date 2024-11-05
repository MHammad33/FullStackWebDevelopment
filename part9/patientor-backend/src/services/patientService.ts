import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const getAllPatientDetails = (): NonSensitivePatient[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const createNewPatient = (patient: NewPatient): Patient => {
	const newPatientData = {
		id: uuid(),
		...patient,
	};

	patientsData.push(newPatientData);
	return newPatientData;
};

const getPatientById = (patientId: string): Patient => {
	const patient = patientsData.find((patient) => patient.id === patientId);
	if (!patient) {
		throw new Error("Patient with given id does not exist");
	}
	return patient;
};

export default {
	getAllPatientDetails,
	createNewPatient,
	getPatientById,
};
