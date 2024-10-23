export interface DiagnosisInfo {
	code: string;
	name: string;
	latin?: string;
}

export type Gender = "male" | "female" | "other";

export interface PatientRecord {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
}
