export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "others",
}

export interface PatientInfo {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export type NonSensitivePatient = Omit<PatientInfo, "ssn" | "entries">;

export type NewPatientInfo = Omit<PatientInfo, "id">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;

export type EntryWithoutId = UnionOmit<Entry, "id">;
