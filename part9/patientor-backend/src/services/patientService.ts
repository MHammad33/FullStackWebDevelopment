import patientsData from "../../data/patients";
import { PatientInfo } from "../types";

const getAllPatientDetails = (): PatientInfo[] => {
	return patientsData;
};

export default {
	getAllPatientDetails,
};
