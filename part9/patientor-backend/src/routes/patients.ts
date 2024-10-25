import { Router } from "express";
import patientService from "../services/patientService";

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

patientRouter.post("/", (_req, res) => {
	res.send("Creating a new patient...");
});

export default patientRouter;
