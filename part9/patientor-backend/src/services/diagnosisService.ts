import diagnosisData from "../../data/diagnosis";
import { Diagnosis } from "../types";

const getAllDiagnosis = (): Diagnosis[] => {
	return diagnosisData;
};

export default {
	getAllDiagnosis,
};
