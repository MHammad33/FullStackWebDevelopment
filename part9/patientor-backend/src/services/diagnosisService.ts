import diagnosisData from "../../data/diagnosis";
import { DiagnosisInfo } from "../types";

const getDiagnosis = (): DiagnosisInfo[] => {
	return diagnosisData;
};

export default {
	getDiagnosis,
};
