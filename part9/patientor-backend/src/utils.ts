import { Gender, NewPatientInfo } from "./types";

export const toNewPatientData = (object: unknown): NewPatientInfo => {
	console.log(object);
	const newPatient: NewPatientInfo = {
		name: parseName(object.name),
		dateOfBirth: parseDate(object.dateOfBirth),
		ssn: parseSSN(object.ssn),
		gender: parseGender(object.gender),
		occupation: parseOccupation(object.occupation),
	};

	return newPatient;
};

const parseName = (name: unknown) => {
	if (!name || !isString(name)) {
		throw new Error("Incorrect or missing name");
	}

	return name;
};

const parseOccupation = (occupation: unknown) => {
	if (!occupation || !isString(occupation)) {
		throw new Error("Incorrect or missing occupation");
	}

	return occupation;
};

const parseSSN = (ssn: unknown) => {
	if (!ssn || isString(ssn)) {
		throw new Error("Incorrect or missing ssn");
	}

	return ssn;
};

const isString = (text: unknown) => {
	return typeof text === "string" || text instanceof String;
};

const parseDate = (date: unknown) => {
	if (!date || !isDate(date)) {
		throw new Error("Incorrect or missing date");
	}

	return date;
};

const isDate = (date: string) => {
	return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error("Incorrect or missing gender: " + gender);
	}

	return gender;
};

const isGender = (gender: string): gender is Gender => {
	return Object.values(Gender)
		.map((g) => g.toString())
		.includes(gender);
};
