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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface PatientInfo {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}

export type NonSensitivePatient = Omit<PatientInfo, "ssn" | "entries">;

export type NewPatientInfo = Omit<PatientInfo, "id">;
