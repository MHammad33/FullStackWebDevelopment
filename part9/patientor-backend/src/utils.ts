import { z } from "zod";
import { Gender, NewPatientInfo } from "./types";

export const toNewPatientData = (object: unknown): NewPatientInfo => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if (
		"name" in object &&
		"dateOfBirth" in object &&
		"gender" in object &&
		"ssn" in object &&
		"occupation" in object
	) {
		const newPatient: NewPatientInfo = {
			name: z.string().parse(object.name),
			dateOfBirth: z.string().date().parse(object.dateOfBirth),
			ssn: z.string().parse(object.ssn),
			gender: z.nativeEnum(Gender).parse(object.gender),
			occupation: z.string().parse(object.occupation),
		};

		return newPatient;
	}

	throw new Error("Incorrect data: some fields are missing");
};
