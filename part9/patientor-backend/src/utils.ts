import { z } from "zod";
import { Gender } from "./types";

export const NewPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.string().date(),
	ssn: z.string(),
	gender: z.nativeEnum(Gender),
	occupation: z.string(),
});

const BaseEntrySchema = z.object({
	description: z.string(),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	specialist: z.string(),
	diagnosisCodes: z
		.array(z.string())
		.optional()
		.transform((code) => code ?? []),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
	type: z.literal("HealthCheck"),
	healthCheckRating: z.number().min(0).max(3),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
	type: z.literal("Hospital"),
	discharge: z.object({
		date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
		criteria: z.string(),
	}),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
	type: z.literal("OccupationalHealthcare"),
	employerName: z.string(),
	sickLeave: z
		.object({
			startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
			endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
		})
		.optional(),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
	HealthCheckEntrySchema,
	HospitalEntrySchema,
	OccupationalHealthcareEntrySchema,
]);
