import { Router } from "express";
import patientService from "../services/patientService";
import { toNewPatientData } from "../utils";
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

patientRouter.post("/", (req, res) => {
	try {
		const newPatientData = toNewPatientData(req.body);
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
