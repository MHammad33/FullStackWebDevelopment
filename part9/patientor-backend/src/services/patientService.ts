import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { NewPatientInfo, PatientInfo } from "../types";

type PatientInfoWithoutSSN = Omit<PatientInfo, "ssn">;

const getAllPatientDetails = (): PatientInfoWithoutSSN[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const createNewPatient = (patient: NewPatientInfo): PatientInfo => {
	const newPatientData = {
		id: uuid(),
		...patient,
	};

	patientsData.push(newPatientData);
	return newPatientData;
};

export default {
	getAllPatientDetails,
	createNewPatient,
};
