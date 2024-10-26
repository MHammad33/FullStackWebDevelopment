export interface DiagnosisInfo {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = "male",
	Female = "female",
	Others = "others",
}

export interface PatientInfo {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
}

export type NewPatientInfo = Omit<PatientInfo, "id">;
