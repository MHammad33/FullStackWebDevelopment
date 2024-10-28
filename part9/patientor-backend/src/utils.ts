import { z } from "zod";
import { Gender, NewPatientInfo } from "./types";

const newPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.string().date(),
	ssn: z.string(),
	gender: z.nativeEnum(Gender),
	occupation: z.string(),
});

export const toNewPatientData = (object: unknown): NewPatientInfo => {
	return newPatientSchema.parse(object);
};
