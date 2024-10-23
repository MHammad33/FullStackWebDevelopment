import diagnosisData from "../../data/diagnosis";
import { DiagnosisInfo } from "../types";

const getAllDiagnosis = (): DiagnosisInfo[] => {
	return diagnosisData;
};

export default {
	getAllDiagnosis,
};
