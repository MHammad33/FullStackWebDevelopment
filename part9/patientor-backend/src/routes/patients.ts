import { NextFunction, Request, Response, Router } from "express";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../utils";
import { z } from "zod";

const patientRouter = Router();

patientRouter.get("/", (_req, res) => {
	try {
		const patients = patientService.getAllPatientDetails();
		res.json(patients);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "An error occurred while fetching diagnoses." });
	}
});

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientSchema.parse(req.body);
		next();
	} catch (error) {
		next(error);
	}
};

patientRouter.post("/", newDiaryParser, (req, res) => {
	try {
		const newPatientData = NewPatientSchema.parse(req.body);
		const newPatient = patientService.createNewPatient(newPatientData);
		res.json(newPatient);
	} catch (error: unknown) {
		if (error instanceof z.ZodError) {
			res.status(400).send({ error: error.issues });
		} else {
			res.status(400).send({ error: "Unknown error" });
		}
	}
});

export default patientRouter;
