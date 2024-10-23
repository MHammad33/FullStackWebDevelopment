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

export default {
	getAllPatientDetails,
};
