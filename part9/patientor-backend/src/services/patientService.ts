import patientsData from "../../data/patients";
import { PatientInfo } from "../types";

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

const createNewPatient = (patient: any) => {
	patientsData.push(patient);
};

export default {
	getAllPatientDetails,
	createNewPatient,
};
